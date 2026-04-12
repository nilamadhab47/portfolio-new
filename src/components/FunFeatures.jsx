import { useState, useEffect } from "react";

export const FunFeatures = () => {
  const [timeOnSite, setTimeOnSite] = useState(0);

  // Timer for time on site
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnSite((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  const getTimeMessage = () => {
    if (timeOnSite < 10) return "Just got here 👋";
    if (timeOnSite < 30) return "Looking around 👀";
    if (timeOnSite < 60) return "Getting interested! 🤔";
    if (timeOnSite < 120) return "Really exploring! 🔍";
    if (timeOnSite < 300) return "You're hooked! 🎣";
    if (timeOnSite < 600) return "True dedication! 💪";
    return "You live here now 🏠";
  };

  return (
    <div className="fixed bottom-8 left-8 z-40 hidden md:block">
      <div className="bg-overlay border border-green-500/30 px-4 py-3 font-mono text-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-green-500 animate-pulse">●</span>
          <span className="text-green-400 text-xs">Session time</span>
        </div>
        <div className="text-xl font-bold text-th-text">{formatTime(timeOnSite)}</div>
        <div className="text-th-text-muted text-xs mt-1">{getTimeMessage()}</div>
      </div>
    </div>
  );
};
