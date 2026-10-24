import { useEffect, useRef, useState } from "react";
import { FiMousePointer } from "react-icons/fi";

const STORAGE_KEY = "cursor-trail-on";
const GLYPHS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789:.=*+-<>".split("");

// ── Tweak these ──────────────────────────────────────────
const HUE_FROM = 190; // cyan
const HUE_RANGE = 80; // sweeps toward violet (270)
const MATRIX_SIZE = 16; // glyph size in px
const MATRIX_MAX = 500; // max glyphs on screen

function readStoredOn() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "false";
  } catch {
    return true;
  }
}

export default function CursorTrail() {
  const canvasRef = useRef(null);
  const [on, setOn] = useState(readStoredOn);
  const [enabled, setEnabled] = useState(false);
  const onRef = useRef(on);

  useEffect(() => {
    onRef.current = on;
    try {
      localStorage.setItem(STORAGE_KEY, String(on));
    } catch {
      /* storage unavailable */
    }
  }, [on]);

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

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let glyphs = [];
    let lastCell = "";
    let last = null;
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
      if (!onRef.current) {
        last = null;
        return;
      }
      if (e.pointerType && e.pointerType !== "mouse") return;
      const x = e.clientX;
      const y = e.clientY;
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / MATRIX_SIZE));
        for (let i = 1; i <= steps; i += 1) {
          spawnGlyph(last.x + (dx * i) / steps, last.y + (dy * i) / steps);
        }
      } else {
        spawnGlyph(x, y);
      }
      last = { x, y };
    };
    const onLeave = () => {
      last = null;
    };
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    const frame = () => {
      ctx.clearRect(0, 0, w, h);

      if (!onRef.current) {
        glyphs = [];
        lastCell = "";
      } else {
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
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 z-[60] pointer-events-none"
      />
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        aria-label={`Matrix cursor trail: ${on ? "on" : "off"}. Click to toggle.`}
        className="fixed bottom-8 left-8 z-50 glass rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-mono text-white/60 hover:text-violet-300 border border-white/5 hover:border-violet-500/30 transition-colors"
      >
        <FiMousePointer size={14} />
        Matrix: {on ? "On" : "Off"}
      </button>
    </>
  );
}
