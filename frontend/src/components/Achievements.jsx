import { motion } from "framer-motion";
import { achievements } from "../data/portfolio";
import { SectionTitle } from "./About";

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          label="// achievements"
          title={<><span className="gradient-text">Achievements</span> & Highlights</>}
          subtitle="Milestones from hackathons, publications, and leadership"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass rounded-2xl p-7 border border-white/5 glass-hover transition-all duration-300 group text-center"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="text-5xl mb-5 inline-block"
              >
                {a.icon}
              </motion.div>
              <h3 className="text-white font-bold text-base mb-3 group-hover:text-violet-300 transition-colors leading-snug">
                {a.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* GitHub stats banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 glass rounded-2xl p-6 border border-violet-500/10 text-center"
        >
          <p className="text-white/40 text-sm mb-4 font-mono">// github activity</p>
          <img
            src="https://github-readme-stats.vercel.app/api?username=SHWETA0920&theme=tokyonight&hide_border=true&show_icons=true&bg_color=0d0d1a&title_color=a78bfa&text_color=94a3b8&icon_color=06b6d4"
            alt="GitHub Stats"
            className="mx-auto rounded-xl max-w-sm w-full"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
