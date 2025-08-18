import { useState, useEffect } from 'react';

export const MouseAnimation = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const mouseEnter = () => setCursorVariant('hover');
    const mouseLeave = () => setCursorVariant('default');

    // Add mouse move listener
    window.addEventListener('mousemove', mouseMove);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], .cursor-pointer, input, textarea'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', mouseEnter);
      el.addEventListener('mouseleave', mouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', mouseEnter);
        el.removeEventListener('mouseleave', mouseLeave);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
    }
  };

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference transition-all duration-150 ease-out"
        style={{
          transform: `translate3d(${variants[cursorVariant].x}px, ${variants[cursorVariant].y}px, 0) scale(${variants[cursorVariant].scale})`,
        }}
      >
        <div className="w-full h-full bg-white rounded-full opacity-80"></div>
      </div>

      {/* Trailing cursor */}
      <div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-40 transition-all duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePosition.x - 4}px, ${mousePosition.y - 4}px, 0)`,
        }}
      >
        <div className="w-full h-full bg-blue-500 rounded-full opacity-60"></div>
      </div>

      {/* Glow effect */}
      <div
        className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-30 transition-all duration-500 ease-out opacity-20"
        style={{
          transform: `translate3d(${mousePosition.x - 32}px, ${mousePosition.y - 32}px, 0)`,
        }}
      >
        <div className="w-full h-full bg-gradient-radial from-blue-400 to-transparent rounded-full"></div>
      </div>
    </>
  );
};
