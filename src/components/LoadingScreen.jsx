import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [showAscii, setShowAscii] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [funFact, setFunFact] = useState("");

  const funFacts = [
    "Fun fact: I mass destroy bugs for a living 🐛",
    "Loading 420 beers into memory... 🍺",
    "Convincing servers to behave...",
    "Teaching Kubernetes to play nice...",
    "Asking AWS for a discount (denied)...",
    "Converting alcohol to code... 🍻",
    "Debugging my life choices...",
    "Deploying bad decisions to production...",
  ];

  const bootSequence = [
    { text: "> Initializing system...", delay: 0 },
    { text: "> Loading neural networks... OK", delay: 150 },
    { text: "> Connecting to matrix... OK", delay: 300 },
    { text: "> Opening beer... 🍺 OK", delay: 450 },
    { text: "> Deploying creativity... OK", delay: 600 },
    { text: "> System ready. Let's party! 🎉", delay: 750 },
  ];

  const asciiArt = `
 ███╗   ██╗██╗██╗      █████╗ ███╗   ███╗ █████╗ ██████╗ ██╗  ██╗ █████╗ ██████╗ 
 ████╗  ██║██║██║     ██╔══██╗████╗ ████║██╔══██╗██╔══██╗██║  ██║██╔══██╗██╔══██╗
 ██╔██╗ ██║██║██║     ███████║██╔████╔██║███████║██║  ██║███████║███████║██████╔╝
 ██║╚██╗██║██║██║     ██╔══██║██║╚██╔╝██║██╔══██║██║  ██║██╔══██║██╔══██║██╔══██╗
 ██║ ╚████║██║███████╗██║  ██║██║ ╚═╝ ██║██║  ██║██████╔╝██║  ██║██║  ██║██████╔╝
 ╚═╝  ╚═══╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ 
`;

  useEffect(() => {
    // Set random fun fact
    setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);

    bootSequence.forEach((line, idx) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line.text]);
      }, line.delay);
    });

    setTimeout(() => setShowAscii(true), 900);
    
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 400);
    }, 1800);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-400 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Scan line effect */}
      <div 
        className="absolute left-0 right-0 h-[2px] bg-green-500/20 pointer-events-none animate-scan"
        style={{ animation: 'scan 1.5s linear infinite' }}
      />

      <div className="max-w-4xl w-full px-4">
        {/* Terminal window */}
        <div className="border border-green-500/30 bg-black/90 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-green-500/20 bg-green-500/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-green-500/60 text-xs font-mono ml-4">
              nilamadhab@bar:~$ ./cheers.sh
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-sm min-h-[300px]">
            {/* Boot sequence */}
            <div className="space-y-1 mb-6">
              {lines.map((line, idx) => (
                <div 
                  key={idx} 
                  className={`${
                    line.includes('OK') ? 'text-green-400' : 
                    line.includes('party') ? 'text-green-300 font-bold' :
                    'text-green-500/70'
                  }`}
                >
                  {line}
                </div>
              ))}
              {lines.length < bootSequence.length && (
                <span className="inline-block w-3 h-5 bg-green-500 animate-blink"></span>
              )}
            </div>

            {/* ASCII art */}
            {showAscii && (
              <div className="overflow-x-auto">
                <pre className="text-green-400 text-[6px] sm:text-[8px] md:text-[10px] leading-tight font-bold whitespace-pre">
                  {asciiArt}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Fun loading message */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-green-500/50 text-sm font-mono animate-pulse">
            {funFact}
          </p>
          <p className="text-green-500/30 text-xs font-mono">
            🍺 Cheers from Gurugram!
          </p>
        </div>
      </div>

      {/* Scan animation keyframes */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 1; }
          100% { top: 100%; opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};
