import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { personalInfo, education } from "../data/portfolio";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

function SectionTitle({ label, title, subtitle }) {
  return (
    <div className="text-center mb-16">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono text-violet-400 text-sm mb-3 tracking-widest uppercase"
      >
        {label}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl lg:text-5xl font-bold text-white"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/40 mt-3 max-w-xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export { SectionTitle };

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          label="// about me"
          title={<>Who <span className="gradient-text">I Am</span></>}
          subtitle="A passionate developer crafting meaningful digital experiences"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="glass rounded-2xl p-8 neon-border mb-6">
              <p className="code-tag mb-4">&lt;about&gt;</p>
              <p className="text-white/70 leading-relaxed mb-4">
                I'm a fourth-year <span className="text-violet-300 font-medium">Computer Science student</span> at KIIT University, deeply passionate about building things that matter. From intelligent AI systems to polished full-stack apps — I love turning ideas into reality.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                My journey spans <span className="text-cyan-300 font-medium">full-stack development</span> with React and Node.js, <span className="text-violet-300 font-medium">machine learning</span> with Python and LangChain, and solving algorithmic challenges. I believe great software is both technically solid and beautifully designed.
              </p>
              <p className="text-white/70 leading-relaxed">
                Outside of code, I've ranked <span className="text-cyan-300 font-medium">Top 100 in Myntra HackerRamp</span> among 5000+ teams and published a research paper on smart city infrastructure.
              </p>
              <p className="code-tag mt-4">&lt;/about&gt;</p>
            </div>

            {/* Contact info */}
            <div className="grid grid-cols-1 gap-3">
              {[
                { icon: FiMapPin, value: personalInfo.location, color: "text-violet-400" },
                { icon: FiMail, value: personalInfo.email, color: "text-cyan-400" },
                { icon: FiPhone, value: personalInfo.phone, color: "text-violet-400" },
              ].map(({ icon: Icon, value, color }) => (
                <div key={value} className="flex items-center gap-3 glass rounded-xl px-4 py-3 border border-white/5">
                  <Icon size={16} className={color} />
                  <span className="text-white/60 text-sm">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Education */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="gradient-text">Education</span>
              <div className="flex-1 h-px bg-gradient-to-r from-violet-500/20 to-transparent ml-3" />
            </h3>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="glass rounded-2xl p-6 border border-white/5 glass-hover transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{edu.icon}</span>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-sm leading-snug mb-1">{edu.degree}</h4>
                      <p className="text-violet-300 text-sm font-medium">{edu.institution}</p>
                      <p className="text-white/40 text-xs mt-1">{edu.location}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs font-mono text-white/30 bg-white/5 px-2 py-1 rounded-lg">{edu.period}</span>
                        <span className="text-xs font-semibold text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-lg">{edu.grade}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fun fact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-4 glass rounded-2xl p-5 border border-cyan-500/20 bg-cyan-500/5"
            >
              <p className="text-xs font-mono text-cyan-400 mb-1">📌 Currently</p>
              <p className="text-white/70 text-sm">Looking for SDE / ML internships and full-time opportunities after graduation in 2027.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
