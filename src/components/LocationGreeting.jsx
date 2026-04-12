import { useState, useEffect } from "react";

export const LocationGreeting = () => {
  const [location, setLocation] = useState(null);
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(false);

  const greetings = {
    IN: { text: "Namaste from India! 🙏", emoji: "🇮🇳", color: "#ff9933" },
    US: { text: "Hey there, America! 🇺🇸", emoji: "🦅", color: "#3c3b6e" },
    UK: { text: "Cheerio from UK! 🇬🇧", emoji: "☕", color: "#c8102e" },
    DE: { text: "Guten Tag! Prost! 🍺", emoji: "🇩🇪", color: "#ffcc00" },
    JP: { text: "こんにちは! 🇯🇵", emoji: "🗾", color: "#bc002d" },
    AU: { text: "G'day mate! 🦘", emoji: "🇦🇺", color: "#00008b" },
    CA: { text: "Hello, eh! 🍁", emoji: "🇨🇦", color: "#ff0000" },
    BR: { text: "Olá! Tudo bem? 🇧🇷", emoji: "⚽", color: "#009c3b" },
    FR: { text: "Bonjour! 🇫🇷", emoji: "🥖", color: "#0055a4" },
    NL: { text: "Hallo! 🇳🇱", emoji: "🌷", color: "#ff6600" },
    SG: { text: "Hello lah! 🇸🇬", emoji: "🦁", color: "#ed2939" },
    AE: { text: "Marhaba! 🇦🇪", emoji: "🏜️", color: "#00732f" },
    RU: { text: "Привет! 🇷🇺", emoji: "🐻", color: "#0039a6" },
    CN: { text: "你好! 🇨🇳", emoji: "🐉", color: "#de2910" },
    KR: { text: "안녕하세요! 🇰🇷", emoji: "🎮", color: "#003478" },
  };

  useEffect(() => {
    // Auto-detect location via IP
    const detectLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        
        const greeting = greetings[data.country_code] || {
          text: `Hello from ${data.country_name}! 🌍`,
          emoji: "🌎",
          color: "#22c55e"
        };

        setLocation({
          city: data.city,
          country: data.country_name,
          countryCode: data.country_code,
          ...greeting
        });

        // Show animation after a short delay
        setTimeout(() => setShow(true), 500);
        
        // Hide after 5 seconds
        setTimeout(() => setHide(true), 6000);
      } catch (error) {
        console.log("Could not detect location");
      }
    };

    detectLocation();
  }, []);

  if (!location || hide) return null;

  return (
    <div
      className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}
    >
      <div 
        className="bg-overlay border-2 px-6 py-4 flex items-center gap-4 shadow-lg"
        style={{ borderColor: location.color }}
      >
        <span className="text-4xl animate-bounce">{location.emoji}</span>
        <div>
          <p className="text-th-text font-bold text-lg">{location.text}</p>
          <p className="text-th-text-sub text-sm">
            Visitor from <span style={{ color: location.color }}>{location.city}, {location.country}</span>
          </p>
        </div>
        <button 
          onClick={() => setHide(true)}
          className="text-th-text-muted hover:text-th-text ml-4"
        >
          ×
        </button>
      </div>
    </div>
  );
};
