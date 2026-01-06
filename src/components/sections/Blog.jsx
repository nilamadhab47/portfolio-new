import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";

export const Blog = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section
      id="blog"
      className="min-h-screen flex items-center justify-center py-32 px-6"
    >
      <RevealOnScroll>
        <div className="max-w-4xl w-full">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-green-500 font-mono text-sm">04</span>
            <span className="text-[#333]">/</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Writing
            </h2>
          </div>

          {/* White Paper Card */}
          <div className="border-2 border-yellow-500/30 bg-yellow-500/5 p-8 md:p-12 mb-12 relative overflow-hidden">
            {/* Construction tape effect */}
            <div className="absolute -right-20 top-8 rotate-45 bg-yellow-500 text-black font-bold text-xs px-20 py-2">
              UNDER CONSTRUCTION
            </div>

            {/* Status */}
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <span className="block w-4 h-4 bg-yellow-500 rounded-full"></span>
                <span className="absolute inset-0 w-4 h-4 bg-yellow-500 rounded-full animate-ping"></span>
              </div>
              <span className="text-yellow-500 font-mono text-sm uppercase tracking-wider font-bold">
                🚧 Work in Progress
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              White Paper:<br />
              <span className="text-yellow-400">Zero-Data Architecture</span>
            </h3>

            <p className="text-[#888] text-xl mb-6">
              Privacy Without Trust. Security Without Data. 🔐
            </p>

            <p className="text-[#555] text-lg leading-relaxed mb-8 max-w-2xl">
              A deep dive into privacy-preserving infrastructure combining 
              Zero-Knowledge Proofs, Multi-Party Computation, and decentralized 
              storage. (Writing this between beers 🍺)
            </p>

            {/* Progress - gamified */}
            <div className="mb-8">
              <div className="flex justify-between text-sm font-mono mb-3">
                <span className="text-[#555]">Progress</span>
                <span className="text-yellow-400 font-bold">65% 🔥</span>
              </div>
              <div className="h-4 bg-[#111] overflow-hidden rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 transition-all duration-1000 rounded-full relative"
                  style={{ width: '65%' }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              <p className="text-[#444] text-xs font-mono mt-2">
                35% more beers required 🍺
              </p>
            </div>

            {/* Topics */}
            <div className="flex flex-wrap gap-3 mb-8">
              {["Zero-Knowledge Proofs", "MPC", "IPFS", "Privacy Infrastructure"].map((topic, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 border border-yellow-500/30 text-yellow-500/80 font-mono text-sm hover:bg-yellow-500/10 transition-colors"
                >
                  {topic}
                </span>
              ))}
            </div>

            {/* Disabled CTA */}
            <button
              disabled
              className="w-full py-5 border-2 border-dashed border-[#333] text-[#444] font-mono text-sm cursor-not-allowed flex items-center justify-center gap-3 hover:border-[#444] transition-colors"
            >
              <span className="animate-spin">⏳</span>
              Coming Soon — Still at the bar researching
            </button>
          </div>

          {/* Subscribe */}
          <div className="text-center">
            <p className="text-[#555] mb-6">
              {subscribed 
                ? "🎉 Cheers! You'll be the first to know. (No spam, pinky swear 🤞)" 
                : "Get notified when it drops (and maybe some memes)"
              }
            </p>
            
            {!subscribed && (
              <form onSubmit={handleSubscribe} className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="hoverable flex-1 bg-transparent border border-[#222] px-5 py-4 text-white font-mono text-sm placeholder-[#333] focus:outline-none focus:border-yellow-500 transition-colors"
                  required
                />
                <button 
                  type="submit"
                  className="hoverable px-8 py-4 bg-yellow-500 text-black font-bold text-sm hover:bg-yellow-400 transition-colors"
                >
                  🔔 Notify Me
                </button>
              </form>
            )}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
