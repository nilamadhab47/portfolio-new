import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section
      const sections = ["home", "about", "projects", "blog", "contact"];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Work" },
    { href: "#blog", label: "Writing" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        scrolled ? "nav-scrolled" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a 
            href="#home"
            className="hoverable group flex items-center gap-2"
          >
            <span className="text-2xl font-bold text-th-text group-hover:text-green-400 transition-colors">
              NS
            </span>
            <span className="hidden md:inline text-th-text-muted font-mono text-xs group-hover:text-green-500 transition-colors">
              .dev
            </span>
          </a>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              className="hoverable w-10 h-10 relative z-40 flex items-center justify-center"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 bg-th-text transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-th-text transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-th-text transition-all duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`hoverable text-sm transition-colors ${
                  activeSection === link.href.slice(1) 
                    ? "text-green-400 font-bold" 
                    : "text-th-text-muted hover:text-th-text"
                }`}
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
            <a
              href="https://drive.google.com/file/d/1Zcp20cY9okPTzTBPOZAW2APlnSw94uh5/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hoverable ml-2 px-5 py-2.5 border border-green-500/50 text-green-400 text-sm font-bold hover:bg-green-500 hover:text-black transition-all"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
