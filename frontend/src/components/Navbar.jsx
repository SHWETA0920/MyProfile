import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";

const navItems = ["Home", "About", "Experience", "Projects", "Skills", "Achievements", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass border-b border-white/5 py-3" : "py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="home" smooth duration={600} className="cursor-pointer">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg shimmer-btn flex items-center justify-center text-white font-bold text-sm">
                SG
              </div>
              <span className="font-mono text-sm text-white/70 hidden sm:block">
                shweta<span className="text-violet-400">.dev</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item}
                to={item.toLowerCase()}
                smooth
                duration={600}
                spy
                onSetActive={() => setActive(item)}
                className="nav-link cursor-pointer text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                {active === item ? (
                  <span className="gradient-text font-medium">{item}</span>
                ) : (
                  item
                )}
              </Link>
            ))}
            <motion.a
              href="https://github.com/SHWETA0920"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shimmer-btn text-white text-sm px-4 py-2 rounded-lg font-medium"
            >
              GitHub ↗
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className={`w-6 flex flex-col gap-1.5 transition-all ${menuOpen ? "gap-0" : ""}`}>
              <span className={`h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-0.5" : ""}`} />
              <span className={`h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-4 right-4 z-40 glass rounded-2xl p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item}
                  to={item.toLowerCase()}
                  smooth
                  duration={600}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/70 hover:text-white transition-colors text-sm font-medium"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
