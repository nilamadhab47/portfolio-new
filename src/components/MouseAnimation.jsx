import { useState, useEffect, useRef } from 'react';

export const MouseAnimation = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState([]);
  const trailLength = 8;

  useEffect(() => {
    let animationFrame;
    
    const mouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Add to trail
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
        return newTrail.slice(-trailLength);
      });
    };

    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);
    const mouseLeave = () => setIsVisible(false);
    const mouseEnter = () => setIsVisible(true);

    const handleElementEnter = () => setIsHovering(true);
    const handleElementLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    document.addEventListener('mouseleave', mouseLeave);
    document.addEventListener('mouseenter', mouseEnter);

    const addHoverListeners = () => {
      const elements = document.querySelectorAll('a, button, input, textarea, .hoverable');
      elements.forEach(el => {
        el.addEventListener('mouseenter', handleElementEnter);
        el.addEventListener('mouseleave', handleElementLeave);
      });
      return elements;
    };

    let elements = addHoverListeners();

    const observer = new MutationObserver(() => {
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementEnter);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
      elements = addHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mouseleave', mouseLeave);
      document.removeEventListener('mouseenter', mouseEnter);
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementEnter);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
      observer.disconnect();
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const cursorSize = isClicking ? 8 : isHovering ? 48 : 16;
  const cursorOffset = cursorSize / 2;

  return (
    <>
      {/* Trail dots */}
      {trail.map((point, idx) => (
        <div
          key={point.id}
          className="fixed top-0 left-0 pointer-events-none z-40 rounded-full bg-th-text"
          style={{
            width: `${(idx + 1) * 1}px`,
            height: `${(idx + 1) * 1}px`,
            opacity: (idx + 1) / trailLength * 0.3,
            transform: `translate3d(${point.x - (idx + 1) * 0.5}px, ${point.y - (idx + 1) * 0.5}px, 0)`,
            transition: 'opacity 0.2s ease',
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference transition-all duration-150 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          transform: `translate3d(${position.x - cursorOffset}px, ${position.y - cursorOffset}px, 0)`,
        }}
      >
        <div 
          className={`w-full h-full rounded-full border-2 border-white transition-all duration-200 ${
            isHovering ? 'bg-white/20' : 'bg-white'
          } ${isClicking ? 'scale-50' : 'scale-100'}`}
        />
      </div>

      {/* Hover ring */}
      {isHovering && (
        <div
          className="fixed top-0 left-0 pointer-events-none z-40 transition-all duration-300 ease-out opacity-50"
          style={{
            width: '60px',
            height: '60px',
            transform: `translate3d(${position.x - 30}px, ${position.y - 30}px, 0)`,
          }}
        >
          <div className="w-full h-full rounded-full border border-green-500/30 animate-ping" />
        </div>
      )}

      {/* Click ripple effect */}
      {isClicking && (
        <div
          className="fixed top-0 left-0 pointer-events-none z-40"
          style={{
            transform: `translate3d(${position.x - 25}px, ${position.y - 25}px, 0)`,
          }}
        >
          <div className="w-[50px] h-[50px] rounded-full border border-green-500/50 animate-ping" />
        </div>
      )}
    </>
  );
};
