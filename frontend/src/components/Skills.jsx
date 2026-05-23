import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { skills } from "../data/portfolio";
import { SectionTitle } from "./About";

const categories = [
  { key: "languages", label: "Languages", emoji: "💻" },
  { key: "frontend", label: "Frontend", emoji: "🎨" },
  { key: "backend", label: "Backend", emoji: "⚙️" },
  { key: "databases", label: "Databases", emoji: "🗄️" },
  { key: "ml", label: "ML / AI", emoji: "🤖" },
];

function SkillBar({ name, level, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="mb-4"
    >
      <div className="flex justify-between mb-1.5">
        <span className="text-white/70 text-sm font-medium">{name}</span>
        <span className="text-white/40 text-xs font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ delay: delay + 0.2, duration: 1.2, ease: "easeOut" }}
          className="h-full skill-bar"
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState("languages");

  return (
    <section id="skills" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          label="// skills"
          title={<>Technical <span className="gradient-text">Skills</span></>}
          subtitle="Technologies I work with to build scalable, intelligent applications"
        />

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Sidebar tabs */}
          <div className="lg:col-span-1 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                whileHover={{ x: 4 }}
                onClick={() => setActive(cat.key)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  active === cat.key
                    ? "shimmer-btn text-white shadow-lg shadow-violet-500/20"
                    : "glass border border-white/5 text-white/50 hover:text-white hover:border-violet-500/20"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Skills display */}
          <div className="lg:col-span-2 glass rounded-2xl p-6 border border-white/5">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-white/50 text-xs font-mono mb-5 tracking-widest uppercase">
                {categories.find((c) => c.key === active)?.emoji}{" "}
                {categories.find((c) => c.key === active)?.label}
              </h3>
              {skills[active]?.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.08} />
              ))}
            </motion.div>
          </div>

          {/* Tools & right panel */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Tools */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="text-white/50 text-xs font-mono mb-4 tracking-widest uppercase">🔧 Tools & Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tool, i) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="text-sm text-violet-300 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-xl font-medium cursor-default"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Radar-style summary */}
            <div className="glass rounded-2xl p-6 border border-cyan-500/10 bg-cyan-500/5 flex-1">
              <h3 className="text-cyan-400/70 text-xs font-mono mb-4 tracking-widest uppercase">💡 Core Strengths</h3>
              <div className="space-y-3">
                {[
                  { label: "Problem Solving (DSA)", pct: 85 },
                  { label: "Full-Stack Dev", pct: 88 },
                  { label: "AI / ML Integration", pct: 78 },
                  { label: "API Design", pct: 85 },
                ].map(({ label, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-white/50 mb-1">
                      <span>{label}</span><span>{pct}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
