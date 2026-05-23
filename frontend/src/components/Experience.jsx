import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { experience } from "../data/portfolio";
import { SectionTitle } from "./About";
import { FiExternalLink, FiMapPin, FiCalendar } from "react-icons/fi";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          label="// experience"
          title={<>Work <span className="gradient-text">Experience</span></>}
          subtitle="Building real-world solutions in professional environments"
        />

        <div ref={ref} className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-cyan-500/30 to-transparent" />

          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.7 }}
              className="relative pl-16 pb-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-3.5 top-1.5 timeline-dot" />

              <div className="glass rounded-2xl p-7 border border-white/5 glass-hover transition-all duration-300">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-white font-bold text-xl">{exp.role}</h3>
                    <p className="text-violet-300 font-semibold mt-1">{exp.company}</p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="flex items-center gap-1 text-white/40 text-xs">
                        <FiMapPin size={11} />{exp.location}
                      </span>
                      <span className="flex items-center gap-1 text-white/40 text-xs">
                        <FiCalendar size={11} />{exp.period}
                      </span>
                    </div>
                  </div>
                  <a
                    href={exp.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 glass px-3 py-1.5 rounded-lg border border-violet-500/20 hover:border-violet-500/40 transition-colors"
                  >
                    <FiExternalLink size={12} /> View Work
                  </a>
                </div>

                {/* Highlights */}
                <ul className="space-y-3 mb-5">
                  {exp.highlights.map((h, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + j * 0.1 }}
                      className="flex items-start gap-3 text-white/60 text-sm leading-relaxed"
                    >
                      <span className="text-cyan-400 mt-1 flex-shrink-0">▹</span>
                      {h}
                    </motion.li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Future indicator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="pl-16"
          >
            <div className="absolute left-3.5 w-3 h-3 rounded-full border-2 border-violet-500/40 border-dashed" />
            <div className="glass rounded-2xl p-5 border border-dashed border-violet-500/20 text-center">
              <p className="text-white/30 text-sm font-mono">// next chapter loading...</p>
              <p className="text-violet-400/60 text-xs mt-1">Open to SDE & ML internships</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
