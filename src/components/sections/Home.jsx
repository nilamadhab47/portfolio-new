import { useState, useEffect } from "react";
import { RevealOnScroll } from "../RevealOnScroll";

export const Home = () => {
  const [time, setTime] = useState(new Date());
  const [beerCount, setBeerCount] = useState(420);
  const [clickStreak, setClickStreak] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementText, setAchievementText] = useState("");
  const [drunkLevel, setDrunkLevel] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Easter egg - beer counter with achievements
  const drinkBeer = () => {
    setBeerCount(prev => prev + 1);
    setClickStreak(prev => prev + 1);
    setDrunkLevel(prev => Math.min(prev + 1, 20));
    
    // Achievement unlocks
    if (clickStreak === 4) {
      unlockAchievement("🍺 Beer Enthusiast!");
    } else if (clickStreak === 9) {
      unlockAchievement("🍻 Party Animal!");
    } else if (clickStreak === 14) {
      unlockAchievement("🥴 Getting Tipsy!");
    } else if (clickStreak === 19) {
      unlockAchievement("🤪 Absolutely Wasted!");
    } else if (clickStreak === 29) {
      unlockAchievement("👑 Legendary Drinker!");
    }
  };

  const unlockAchievement = (text) => {
    setAchievementText(text);
    setShowAchievement(true);
    setTimeout(() => setShowAchievement(false), 2500);
  };

  // Drunk effect for text
  const getDrunkStyle = () => {
    if (drunkLevel < 5) return {};
    return {
      transform: `rotate(${Math.sin(Date.now() / 500) * drunkLevel * 0.3}deg)`,
      transition: 'transform 0.1s ease',
    };
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative px-6 overflow-hidden"
    >
      {/* Achievement popup */}
      {showAchievement && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-yellow-500 text-black px-6 py-3 font-bold text-lg rounded-lg shadow-[0_0_30px_rgba(234,179,8,0.5)]">
            🏆 Achievement Unlocked: {achievementText}
          </div>
        </div>
      )}

      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#fff 1px, transparent 1px),
            linear-gradient(90deg, #fff 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating badge */}
      <div className="absolute top-24 right-8 md:right-16 animate-float">
        <div className="bg-[#111] border border-green-500/30 px-4 py-2 font-mono text-xs">
          <span className="text-green-500 animate-pulse-dot">●</span> 
          <span className="text-green-500/80 ml-2">Open to work (& drinks 🍺)</span>
        </div>
      </div>

      <RevealOnScroll>
        <div className="max-w-5xl" style={getDrunkStyle()}>
          {/* Intro */}
          <p className="text-[#555] font-mono text-sm md:text-base mb-6 tracking-wide">
            Hello, World! I'm
          </p>

          {/* BIG NAME */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4 leading-[0.9]">
            <span className="block text-stroke hover:text-white transition-all duration-300 cursor-default hoverable">
              NILAMADHAB
            </span>
            <span className="block text-white">
              SENAPATI
            </span>
          </h1>

          {/* Role with terminal style */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-green-500 font-mono">→</span>
            <span className="text-2xl md:text-3xl lg:text-4xl font-light text-[#888]">
              Backend & Cloud Engineer
            </span>
          </div>

          {/* Fun description */}
          <p className="text-[#666] text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
            I mass destroy{" "}
            <span className="text-red-400 font-medium line-through hoverable cursor-pointer">bugs</span>{" "}
            <span className="text-green-400 font-medium">features</span>{" "}
            for a living.{" "}
            <span className="text-[#444]">
              3.5+ years shipping code that handles 200K+ users and 20K+ devices 
              while staying hydrated 🍺
            </span>
          </p>

          {/* Stats - gamified */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="group hoverable cursor-default">
              <div className="text-4xl md:text-5xl font-bold text-white group-hover:animate-glitch">
                200K<span className="text-green-500">+</span>
              </div>
              <div className="text-[#555] text-sm font-mono mt-1">
                users served
              </div>
            </div>
            <div className="group hoverable cursor-default">
              <div className="text-4xl md:text-5xl font-bold text-white group-hover:animate-glitch">
                20K<span className="text-green-500">+</span>
              </div>
              <div className="text-[#555] text-sm font-mono mt-1">
                devices managed
              </div>
            </div>
            <div className="group hoverable cursor-default">
              <div className="text-4xl md:text-5xl font-bold text-white group-hover:animate-glitch">
                60<span className="text-green-500">+</span>
              </div>
              <div className="text-[#555] text-sm font-mono mt-1">
                interviews led
              </div>
            </div>
            <div 
              className="group hoverable cursor-pointer select-none" 
              onClick={drinkBeer}
              title="Click to drink beer! 🎮"
            >
              <div className={`text-4xl md:text-5xl font-bold text-white group-hover:animate-glitch group-hover:text-yellow-400 transition-colors ${drunkLevel > 10 ? 'animate-pulse' : ''}`}>
                {beerCount}<span className="text-yellow-500">🍺</span>
              </div>
              <div className="text-[#555] text-sm font-mono mt-1 group-hover:text-yellow-500/50 transition-colors">
                {clickStreak > 0 ? (
                  <span>🔥 {clickStreak} streak! {drunkLevel > 5 ? '🥴' : ''}</span>
                ) : (
                  "beers consumed (click!)"
                )}
              </div>
              {drunkLevel > 0 && (
                <div className="mt-2 h-1 bg-[#222] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all"
                    style={{ width: `${(drunkLevel / 20) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-6">
            <a
              href="#projects"
              className="group hoverable inline-flex items-center gap-3 text-white text-lg font-medium hover-line"
            >
              See my work
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </a>
            <a
              href="#contact"
              className="hoverable inline-flex items-center gap-3 text-[#555] text-lg font-medium hover:text-white transition-colors hover-line"
            >
              Let's grab a drink 🍻
            </a>
          </div>
        </div>
      </RevealOnScroll>

      {/* Bottom left - time */}
      <div className="absolute bottom-8 left-8 font-mono text-xs text-[#333] hidden md:block">
        {time.toLocaleTimeString('en-US', { hour12: false })} IST
      </div>

      {/* Bottom right - scroll hint */}
      <div className="absolute bottom-8 right-8 font-mono text-xs text-[#333] flex items-center gap-2 hidden md:flex">
        <span>scroll</span>
        <span className="animate-bounce">↓</span>
      </div>
    </section>
  );
};
