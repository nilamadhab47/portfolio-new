import { useState, lazy, Suspense } from "react";

const HandTrackingGame = lazy(() => import("./HandTrackingGame").then(m => ({ default: m.HandTrackingGame })));

export const PlayGameSection = () => {
  const [showGame, setShowGame] = useState(false);

  return (
    <>
      {showGame && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            <p className="text-green-500 font-mono animate-pulse">Loading game...</p>
          </div>
        }>
          <HandTrackingGame onClose={() => setShowGame(false)} />
        </Suspense>
      )}

      <section className="py-20 px-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Floating balls decoration */}
          <div className="absolute -top-10 left-10 w-16 h-16 bg-red-500/20 border border-red-500/50 rounded-full animate-float" />
          <div className="absolute -top-5 right-20 w-12 h-12 bg-cyan-500/20 border border-cyan-500/50 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-1/4 w-10 h-10 bg-yellow-500/20 border border-yellow-500/50 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/2 right-10 w-8 h-8 bg-pink-500/20 border border-pink-500/50 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />

          {/* Section header */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-green-500 font-mono text-sm">03</span>
            <span className="text-th-text-faint">/</span>
            <span className="text-yellow-400 font-mono text-sm uppercase">🎯 Interactive</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-th-text">Target Practice </span>
            <span className="text-green-400">Game</span>
            <span className="text-4xl ml-2">🎯</span>
          </h2>

          <p className="text-th-text-sub text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Grab balls with your hand, throw them at targets, and unlock 
            <span className="text-amber-400"> 🍺 beer</span> and 
            <span className="text-green-400"> 🌿 weed</span> achievements at high scores!
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="bg-overlay-light border border-th-border-mid px-4 py-2 text-sm">
              <span className="text-green-400">🎯</span> Hit Targets
            </div>
            <div className="bg-overlay-light border border-th-border-mid px-4 py-2 text-sm">
              <span className="text-yellow-400">🔥</span> Combo System
            </div>
            <div className="bg-overlay-light border border-th-border-mid px-4 py-2 text-sm">
              <span className="text-amber-400">🍺</span> Beer Rewards
            </div>
            <div className="bg-overlay-light border border-th-border-mid px-4 py-2 text-sm">
              <span className="text-green-400">🌿</span> 420 Mode
            </div>
          </div>

          {/* Achievement Preview */}
          <div className="bg-overlay-light border border-green-500/30 p-4 mb-10 max-w-md mx-auto">
            <p className="text-green-400 font-mono text-xs mb-3">🏆 UNLOCK AT SCORES:</p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded">50: 🍺</span>
              <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded">100: 🍻</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">200: 🌿</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded font-bold">420: 🔥🌿</span>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">800: 🌈</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">1000: 👑🌿</span>
            </div>
          </div>

          {/* Play Button */}
          <button
            onClick={() => setShowGame(true)}
            className="hoverable group relative inline-flex items-center gap-4 bg-gradient-to-r from-green-500 to-emerald-400 text-black px-12 py-6 font-bold text-xl hover:from-green-400 hover:to-emerald-300 transition-all hover:scale-105"
          >
            <span className="text-3xl group-hover:animate-bounce">🎯</span>
            <span>Play & Get High Scores!</span>
            <span className="text-3xl group-hover:animate-bounce">🌿</span>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-green-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity -z-10" />
          </button>

          <p className="text-th-text-dim text-sm mt-6 font-mono">
            Requires webcam • Best on desktop • Get to 420 for special animation! 🌿💨
          </p>
        </div>
      </section>
    </>
  );
};
