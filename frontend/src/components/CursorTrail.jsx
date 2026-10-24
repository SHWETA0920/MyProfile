import { useEffect, useRef, useState } from "react";
import { FiMousePointer } from "react-icons/fi";

const MODES = ["flow", "matrix", "off"];
const LABELS = { flow: "Flow", matrix: "Matrix", off: "Off" };
const STORAGE_KEY = "cursor-trail-mode";
const GLYPHS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789:.=*+-<>".split("");

// ── Tweak these ──────────────────────────────────────────
const HUE_FROM = 190; // cyan
const HUE_RANGE = 80; // sweeps toward violet (270)
const FLOW_POINTS = 40; // trail length for flow mode
const MATRIX_SIZE = 16; // glyph size in px
const MATRIX_MAX = 500; // max glyphs on screen

function readStoredMode() {
  try {
    const m = localStorage.getItem(STORAGE_KEY);
    return MODES.includes(m) ? m : "flow";
  } catch {
    return "flow";
  }
}

export default function CursorTrail() {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState(readStoredMode);
  const [enabled, setEnabled] = useState(false);
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* storage unavailable */
    }
  }, [mode]);

  // Only run with a real mouse, and respect reduced-motion
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0, y: 0, prevX: 0, prevY: 0, speed: 0, lastMove: 0, seeded: false };

    // Flow mode state
    const ribbons = [
      { lag: 0.34, width: 22, phase: 0 },
      { lag: 0.26, width: 17, phase: 2.1 },
      { lag: 0.2, width: 12, phase: 4.2 },
    ].map((r) => ({
      ...r,
      pts: Array.from({ length: FLOW_POINTS }, () => ({ x: 0, y: 0 })),
    }));

    // Matrix mode state
    let glyphs = [];
    let lastCell = "";
    const randGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

    const spawnGlyph = (x, y) => {
      const cx = Math.round(x / MATRIX_SIZE) * MATRIX_SIZE;
      const cy = Math.round(y / MATRIX_SIZE) * MATRIX_SIZE;
      const key = `${cx},${cy}`;
      if (key === lastCell) return;
      lastCell = key;
      glyphs.push({
        x: cx,
        y: cy,
        ch: randGlyph(),
        life: 1,
        decay: 0.007 + Math.random() * 0.012,
        vy: 0.15 + Math.random() * 0.9,
        hue: HUE_FROM + Math.random() * HUE_RANGE,
      });
      if (glyphs.length > MATRIX_MAX) glyphs.splice(0, glyphs.length - MATRIX_MAX);
    };

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      const x = e.clientX;
      const y = e.clientY;
      mouse.prevX = mouse.seeded ? mouse.x : x;
      mouse.prevY = mouse.seeded ? mouse.y : y;
      mouse.x = x;
      mouse.y = y;
      mouse.lastMove = performance.now();

      if (!mouse.seeded) {
        mouse.seeded = true;
        ribbons.forEach((r) => r.pts.forEach((p) => { p.x = x; p.y = y; }));
      }

      if (modeRef.current === "matrix") {
        const dx = mouse.x - mouse.prevX;
        const dy = mouse.y - mouse.prevY;
        const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / MATRIX_SIZE));
        for (let i = 1; i <= steps; i += 1) {
          spawnGlyph(mouse.prevX + (dx * i) / steps, mouse.prevY + (dy * i) / steps);
        }
      }
    };
    window.addEventListener("pointermove", onMove);

    let shownMode = modeRef.current;

    const drawFlow = (act) => {
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const speed = Math.min(mouse.speed, 60);
      const energy = (0.35 + speed / 60) * act;

      ribbons.forEach((r) => {
        const p = r.pts;
        p[0].x += (mouse.x - p[0].x) * (r.lag + 0.25);
        p[0].y += (mouse.y - p[0].y) * (r.lag + 0.25);
        for (let i = 1; i < FLOW_POINTS; i += 1) {
          const wob = Math.sin(t * 3 + r.phase + i * 0.35) * speed * 0.21 * (i / FLOW_POINTS);
          const tx = p[i - 1].x + wob * 0.4;
          const ty = p[i - 1].y + Math.cos(t * 2.4 + r.phase + i * 0.3) * wob * 0.4;
          p[i].x += (tx - p[i].x) * r.lag;
          p[i].y += (ty - p[i].y) * r.lag;
        }
        if (act <= 0.01) return;

        for (let j = 0; j < FLOW_POINTS - 2; j += 1) {
          const k = j / FLOW_POINTS;
          const a = p[j];
          const b = p[j + 1];
          const c = p[j + 2];
          ctx.beginPath();
          ctx.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2);
          ctx.quadraticCurveTo(b.x, b.y, (b.x + c.x) / 2, (b.y + c.y) / 2);
          const hue = HUE_FROM + HUE_RANGE * (0.5 + 0.5 * Math.sin(t * 0.9 + r.phase + k * 2.2));
          const alpha = (1 - k) * 0.55 * Math.min(energy, 1);
          ctx.strokeStyle = `hsla(${hue},90%,62%,${alpha})`;
          ctx.lineWidth = Math.max(0.5, r.width * (1 - k) * (0.5 + energy * 0.6));
          ctx.stroke();
        }
      });
    };

    const drawMatrix = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.font = `${MATRIX_SIZE}px "JetBrains Mono", "MS Gothic", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = glyphs.length - 1; i >= 0; i -= 1) {
        const g = glyphs[i];
        g.life -= g.decay;
        if (g.life <= 0) {
          glyphs.splice(i, 1);
          continue;
        }
        g.y += g.vy;
        if (Math.random() < 0.06) g.ch = randGlyph();
        if (g.life > 0.92) {
          ctx.fillStyle = `rgba(235,240,255,${g.life})`;
          ctx.shadowColor = `hsla(${g.hue},95%,65%,0.9)`;
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = `hsla(${g.hue},90%,62%,${g.life * 0.9})`;
          ctx.shadowBlur = 0;
        }
        ctx.fillText(g.ch, g.x, g.y);
      }
      ctx.shadowBlur = 0;
    };

    const frame = () => {
      t += 0.016;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);

      const current = modeRef.current;
      if (current !== shownMode) {
        shownMode = current;
        glyphs = [];
        lastCell = "";
      }

      const d = Math.hypot(mouse.x - mouse.prevX, mouse.y - mouse.prevY);
      mouse.speed += (d - mouse.speed) * 0.2;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      // Trail fades out after the cursor rests for a moment
      const act = Math.max(0, Math.min(1, 1 - (performance.now() - mouse.lastMove) / 700));

      if (current === "flow") drawFlow(act);
      else if (current === "matrix") drawMatrix();

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  const cycle = () => setMode((m) => MODES[(MODES.indexOf(m) + 1) % MODES.length]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 z-[60] pointer-events-none"
      />
      <button
        type="button"
        onClick={cycle}
        aria-label={`Cursor trail: ${LABELS[mode]}. Click to change.`}
        className="fixed bottom-8 left-8 z-50 glass rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-mono text-white/60 hover:text-violet-300 border border-white/5 hover:border-violet-500/30 transition-colors"
      >
        <FiMousePointer size={14} />
        Trail: {LABELS[mode]}
      </button>
    </>
  );
}