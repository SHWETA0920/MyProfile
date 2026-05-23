import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { projects } from "../data/portfolio";
import { SectionTitle } from "./About";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const colorMap = {
  purple: "from-violet-600/20 to-violet-600/5 border-violet-500/20 hover:border-violet-500/40",
  teal: "from-teal-600/20 to-teal-600/5 border-teal-500/20 hover:border-teal-500/40",
  cyan: "from-cyan-600/20 to-cyan-600/5 border-cyan-500/20 hover:border-cyan-500/40",
  amber: "from-amber-600/20 to-amber-600/5 border-amber-500/20 hover:border-amber-500/40",
  pink: "from-pink-600/20 to-pink-600/5 border-pink-500/20 hover:border-pink-500/40",
  rose: "from-rose-600/20 to-rose-600/5 border-rose-500/20 hover:border-rose-500/40",
};

const tagColorMap = {
  purple: "text-violet-300 bg-violet-500/10 border-violet-500/20",
  teal: "text-teal-300 bg-teal-500/10 border-teal-500/20",
  cyan: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
  amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
  pink: "text-pink-300 bg-pink-500/10 border-pink-500/20",
  rose: "text-rose-300 bg-rose-500/10 border-rose-500/20",
};

const categories = ["All", "Full-Stack + AI", "ML + Full-Stack", "AI / LLM", "AI / RAG", "Full-Stack", "Machine Learning"];

function ProjectCard({ project, index }) {
  const colors = colorMap[project.color] || colorMap.purple;
  const tagColors = tagColorMap[project.color] || tagColorMap.purple;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={`glass bg-gradient-to-br ${colors} rounded-2xl p-6 border transition-all duration-300 group flex flex-col h-full`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{project.icon}</span>
          <div>
            <h3 className="text-white font-bold text-base group-hover:gradient-text transition-all">{project.title}</h3>
            <p className="text-white/40 text-xs mt-0.5">{project.subtitle}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="text-white/40 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
          >
            <FiGithub size={16} />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="text-white/40 hover:text-cyan-400 transition-colors p-1.5 rounded-lg hover:bg-white/5"
            >
              <FiExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Category badge */}
      <span className={`self-start text-xs font-mono px-2.5 py-1 rounded-lg border mb-3 ${tagColors}`}>
        {project.category}
      </span>

      {/* Description */}
      <p className="text-white/50 text-sm leading-relaxed flex-1 mb-5">{project.description}</p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tech.map((t) => (
          <span key={t} className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded-md font-mono">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="projects" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          label="// projects"
          title={<>Featured <span className="gradient-text">Projects</span></>}
          subtitle="A collection of things I've built — from AI platforms to full-stack apps"
        />

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-sm px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                filter === cat
                  ? "shimmer-btn text-white"
                  : "glass border border-white/5 text-white/50 hover:text-white hover:border-violet-500/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          ref={ref}
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show more */}
        {filtered.length > 6 && (
          <div className="text-center mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
              className="glass border border-violet-500/30 text-white px-8 py-3 rounded-xl font-medium text-sm hover:border-violet-500/60 transition-colors"
            >
              {showAll ? "Show Less ↑" : `Show All (${filtered.length}) ↓`}
            </motion.button>
          </div>
        )}

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/40 text-sm mb-4">Find more on GitHub</p>
          <a
            href="https://github.com/SHWETA0920"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
          >
            <FiGithub size={16} />
            github.com/SHWETA0920 ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
