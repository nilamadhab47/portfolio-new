export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const navLinks = [
    { href: "#home", label: "Home", emoji: "🏠" },
    { href: "#about", label: "About", emoji: "👨‍💻" },
    { href: "#projects", label: "Work", emoji: "🚀" },
    { href: "#blog", label: "Writing", emoji: "📝" },
    { href: "#contact", label: "Contact", emoji: "📬" },
  ];

  return (
    <div
      className={`fixed inset-0 bg-th-bg z-30 flex flex-col transition-all duration-500 ${
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Grid background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(var(--c-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--c-grid-line) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          opacity: 'var(--c-grid-opacity)'
        }}
      />

      {/* Navigation */}
      <div className="flex-1 flex flex-col justify-center px-8">
        {navLinks.map((link, idx) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={`group flex items-center gap-6 py-4 border-b border-th-border transition-all duration-500 ${
              menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: menuOpen ? `${idx * 75}ms` : "0ms" }}
          >
            <span className="text-2xl group-hover:animate-bounce">{link.emoji}</span>
            <span className="text-4xl font-bold text-th-text group-hover:text-green-400 transition-all">
              {link.label}
            </span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div 
        className={`px-8 py-8 border-t border-th-border transition-all duration-500 ${
          menuOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: menuOpen ? "400ms" : "0ms" }}
      >
        <a
          href="https://drive.google.com/file/d/1c88GUYRU3b-BBOtiku6TIXQz04QcgqO9/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          className="inline-block px-8 py-4 bg-green-500 text-black font-bold text-sm hover:bg-green-400 transition-colors"
        >
          📄 Download Resume
        </a>
        <p className="text-th-text-faint font-mono text-xs mt-6">
          github.com/nilamadhab47
        </p>
      </div>
    </div>
  );
};
