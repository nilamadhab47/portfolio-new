import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "emailjs-com";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // 'sending', 'sent', 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(() => {
        setStatus('sent');
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => setStatus('error'));
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center py-32 px-6"
    >
      <RevealOnScroll>
        <div className="max-w-4xl w-full">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-green-500 font-mono text-sm">05</span>
            <span className="text-[#333]">/</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Contact
            </h2>
          </div>

          <p className="text-2xl md:text-3xl text-[#888] font-light mb-16 max-w-2xl">
            Got a project in mind? Let's build something{" "}
            <span className="text-green-400 font-medium">awesome</span> together.{" "}
            <span className="text-[#444]">(Beer's on me! 🍺)</span>
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left - Contact Info */}
            <div>
              <div className="space-y-8">
                <a 
                  href="mailto:nilamadhab47@gmail.com"
                  className="group hoverable block"
                >
                  <p className="text-green-500 font-mono text-xs uppercase mb-2 font-bold">📧 Email</p>
                  <p className="text-xl md:text-2xl text-white hover-line group-hover:text-green-400 transition-colors">
                    nilamadhab47@gmail.com
                  </p>
                </a>

                <a 
                  href="https://github.com/nilamadhab47"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hoverable block"
                >
                  <p className="text-green-500 font-mono text-xs uppercase mb-2 font-bold">�‍💻 Github</p>
                  <p className="text-xl md:text-2xl text-white hover-line group-hover:text-green-400 transition-colors">
                    nilamadhab47
                  </p>
                </a>

                <a 
                  href="https://linkedin.com/in/nilamadhabsenapati"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hoverable block"
                >
                  <p className="text-green-500 font-mono text-xs uppercase mb-2 font-bold">💼 LinkedIn</p>
                  <p className="text-xl md:text-2xl text-white hover-line group-hover:text-green-400 transition-colors">
                    /in/nilamadhabsenapati
                  </p>
                </a>

                <div>
                  <p className="text-green-500 font-mono text-xs uppercase mb-2 font-bold">📍 Location</p>
                  <p className="text-xl md:text-2xl text-[#555]">
                    India (open to remote worldwide)
                  </p>
                </div>
              </div>

              {/* Fun message */}
              <div className="mt-12 p-6 border-2 border-green-500/30 bg-green-500/5">
                <p className="text-green-500 font-mono text-sm mb-2">
                  $ currently_seeking
                </p>
                <p className="text-white font-bold">
                  Backend/Cloud roles, Tech Lead positions, or cool startup collaborations 🚀
                </p>
                <p className="text-[#555] text-sm mt-2 italic">
                  (Also down for beer discussions about distributed systems 🍻)
                </p>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              {status === 'sent' ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-8xl mb-6 animate-bounce">🍻</p>
                    <h3 className="text-3xl font-bold text-white mb-3">Cheers! Message Sent!</h3>
                    <p className="text-[#555]">I'll get back to you faster than I finish a beer 🍺</p>
                    <button 
                      onClick={() => setStatus(null)}
                      className="hoverable mt-6 text-green-500 hover:text-green-400 transition-colors font-mono text-sm"
                    >
                      Send another →
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-green-500 font-mono text-xs uppercase mb-3 font-bold">
                      👤 Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="hoverable w-full bg-transparent border-b-2 border-[#222] px-0 py-4 text-xl text-white focus:outline-none focus:border-green-500 transition-colors"
                      placeholder="Your awesome name"
                    />
                  </div>

                  <div>
                    <label className="block text-green-500 font-mono text-xs uppercase mb-3 font-bold">
                      📧 Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="hoverable w-full bg-transparent border-b-2 border-[#222] px-0 py-4 text-xl text-white focus:outline-none focus:border-green-500 transition-colors"
                      placeholder="you@awesome.com"
                    />
                  </div>

                  <div>
                    <label className="block text-green-500 font-mono text-xs uppercase mb-3 font-bold">
                      💬 Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="hoverable w-full bg-transparent border-b-2 border-[#222] px-0 py-4 text-xl text-white focus:outline-none focus:border-green-500 transition-colors resize-none"
                      placeholder="Let's build something cool (or grab a drink)..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="hoverable group w-full py-5 bg-green-500 text-black font-bold text-lg hover:bg-green-400 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Deploying message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <span className="group-hover:translate-x-2 transition-transform">🍻</span>
                      </>
                    )}
                  </button>

                  {status === 'error' && (
                    <p className="text-red-500 text-sm font-mono text-center">
                      💥 Oops! Something crashed. Try again?
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-32 pt-8 border-t border-[#111] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#333] font-mono text-sm">
              © 2026 Nilamadhab Senapati
            </p>
            <p className="text-[#222] font-mono text-xs">
              Built with 🍺 beers, 🎵 lo-fi beats, and questionable decisions
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
