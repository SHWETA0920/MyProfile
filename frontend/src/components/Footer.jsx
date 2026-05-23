import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";
import { personalInfo } from "../data/portfolio";
import { Link } from "react-scroll";

const navItems = ["Home", "About", "Experience", "Projects", "Skills", "Contact"];

export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg shimmer-btn flex items-center justify-center text-white font-bold text-sm">SG</div>
              <span className="font-mono text-white/70">shweta<span className="text-violet-400">.dev</span></span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Building intelligent, scalable, and beautiful software — one project at a time.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white/60 text-xs font-mono tracking-widest uppercase mb-4">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item}
                  to={item.toLowerCase()}
                  smooth
                  duration={600}
                  className="text-white/40 hover:text-violet-300 text-sm cursor-pointer transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white/60 text-xs font-mono tracking-widest uppercase mb-4">Connect</h4>
            <div className="flex gap-3">
              {[
                { icon: FiGithub, href: personalInfo.github },
                { icon: FiLinkedin, href: personalInfo.linkedin },
                { icon: FiMail, href: `mailto:${personalInfo.email}` },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/40 hover:text-violet-300 border border-white/5 hover:border-violet-500/30 transition-all"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
            <p className="text-white/30 text-xs mt-4 font-mono">{personalInfo.email}</p>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-white/30">
          <p>© 2025 Shweta Gupta. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <FiHeart size={12} className="text-violet-400" /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
