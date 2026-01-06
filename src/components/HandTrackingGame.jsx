import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

export const HandTrackingGame = ({ onClose }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const ballsRef = useRef([]);
  const targetsRef = useRef([]);
  const handPosRef = useRef({ x: 0.5, y: 0.5 });
  const lastPinchRef = useRef(false);
  const grabbedBallRef = useRef(null);
  const throwVelocityRef = useRef({ x: 0, y: 0 });
  const lastHandPosRef = useRef({ x: 0.5, y: 0.5 });
  
  const [status, setStatus] = useState("Initializing...");
  const [handsDetected, setHandsDetected] = useState(0);
  const [isPinching, setIsPinching] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [achievement, setAchievement] = useState(null);
  const [showWeedAnimation, setShowWeedAnimation] = useState(false);
  const [particles, setParticles] = useState([]);

  // Achievement milestones
  const achievements = [
    { score: 50, text: "🍺 First Beer Unlocked!", emoji: "🍺", type: "beer" },
    { score: 100, text: "🍻 Getting Tipsy!", emoji: "🍻", type: "beer" },
    { score: 200, text: "🌿 420 Vibes Incoming!", emoji: "🌿", type: "weed" },
    { score: 300, text: "💨 Cloud Nine!", emoji: "💨", type: "weed" },
    { score: 420, text: "🔥 BLAZE IT! 420!", emoji: "🔥🌿", type: "weed_big" },
    { score: 500, text: "🥴 Absolutely Wasted!", emoji: "🥴", type: "drunk" },
    { score: 690, text: "😏 Nice... but with weed!", emoji: "😏🌿", type: "weed" },
    { score: 800, text: "🌈 Seeing Colors!", emoji: "🌈", type: "trippy" },
    { score: 1000, text: "👑 Legendary Stoner!", emoji: "👑🌿", type: "weed_big" },
  ];

  // Check achievements
  useEffect(() => {
    const unlockedAchievement = achievements.find(a => a.score === score);
    if (unlockedAchievement) {
      setAchievement(unlockedAchievement);
      
      if (unlockedAchievement.type === "weed" || unlockedAchievement.type === "weed_big") {
        setShowWeedAnimation(true);
        setTimeout(() => setShowWeedAnimation(false), 4000);
      }
      
      // Spawn celebration particles
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: -10,
          emoji: unlockedAchievement.type.includes("weed") ? "🌿" : "🍺",
          speed: 2 + Math.random() * 3,
          wobble: Math.random() * 10,
        });
      }
      setParticles(newParticles);
      
      setTimeout(() => setAchievement(null), 3000);
      setTimeout(() => setParticles([]), 5000);
    }
  }, [score]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 15);
    scene.add(pointLight);

    const greenLight = new THREE.PointLight(0x00ff88, 0.5);
    greenLight.position.set(-10, -10, 10);
    scene.add(greenLight);

    // Create throwable balls
    const balls = [];
    const ballColors = [0xff6b6b, 0x4ecdc4, 0xffe66d, 0x95e1d3, 0xf38181, 0xaa96da, 0xfcbad3];
    
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.SphereGeometry(0.8, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: ballColors[i % ballColors.length],
        emissive: ballColors[i % ballColors.length],
        emissiveIntensity: 0.3,
        shininess: 100,
      });
      const ball = new THREE.Mesh(geometry, material);
      
      ball.position.x = -12 + i * 3;
      ball.position.y = -8;
      ball.position.z = 0;

      ball.userData = {
        velocity: new THREE.Vector3(0, 0, 0),
        grabbed: false,
        originalColor: ballColors[i % ballColors.length],
        originalX: ball.position.x,
        originalY: ball.position.y,
      };

      scene.add(ball);
      balls.push(ball);
    }
    ballsRef.current = balls;

    // Create targets (floating rings/discs)
    const targets = [];
    const targetPositions = [
      { x: 8, y: 5, points: 10 },
      { x: -8, y: 6, points: 10 },
      { x: 0, y: 8, points: 25 },
      { x: 10, y: -2, points: 15 },
      { x: -10, y: -3, points: 15 },
      { x: 5, y: 2, points: 20 },
      { x: -5, y: 3, points: 20 },
      { x: 0, y: 0, points: 50 }, // Center bullseye
    ];

    targetPositions.forEach((pos, i) => {
      // Outer ring
      const ringGeometry = new THREE.TorusGeometry(1.2, 0.15, 16, 32);
      const ringMaterial = new THREE.MeshPhongMaterial({
        color: pos.points >= 50 ? 0xffd700 : pos.points >= 25 ? 0xff00ff : 0x00ff88,
        emissive: pos.points >= 50 ? 0xffd700 : pos.points >= 25 ? 0xff00ff : 0x00ff88,
        emissiveIntensity: 0.5,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.set(pos.x, pos.y, -5);
      ring.rotation.x = Math.PI / 2;
      
      // Inner disc
      const discGeometry = new THREE.CircleGeometry(1, 32);
      const discMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
        opacity: 0.5,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const disc = new THREE.Mesh(discGeometry, discMaterial);
      disc.position.set(pos.x, pos.y, -5);

      ring.userData = { points: pos.points, hit: false, originalY: pos.y };
      
      scene.add(ring);
      scene.add(disc);
      targets.push(ring);
    });
    targetsRef.current = targets;

    // Animation loop
    const clock = new THREE.Clock();
    let animationId;
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Animate targets (floating motion)
      targets.forEach((target, i) => {
        target.position.y = target.userData.originalY + Math.sin(time * 2 + i) * 0.5;
        target.rotation.z += 0.02;
        
        // Reset hit state after animation
        if (target.userData.hit) {
          target.scale.setScalar(1 + Math.sin(time * 20) * 0.2);
        }
      });

      // Ball physics
      balls.forEach((ball) => {
        if (ball.userData.grabbed) {
          const targetX = (handPosRef.current.x - 0.5) * 30;
          const targetY = -(handPosRef.current.y - 0.5) * 20;
          
          // Track velocity for throwing
          throwVelocityRef.current = {
            x: (handPosRef.current.x - lastHandPosRef.current.x) * 50,
            y: -(handPosRef.current.y - lastHandPosRef.current.y) * 50,
          };
          
          ball.position.x += (targetX - ball.position.x) * 0.4;
          ball.position.y += (targetY - ball.position.y) * 0.4;
          ball.position.z = 5;
          
          ball.rotation.x += 0.2;
          ball.rotation.y += 0.2;
        } else {
          // Apply physics
          ball.userData.velocity.y -= 0.02; // Gravity
          ball.position.add(ball.userData.velocity);
          
          // Move towards targets when thrown
          if (ball.userData.velocity.length() > 0.1) {
            ball.position.z -= 0.3; // Move into screen
            
            // Check target collisions
            targets.forEach((target) => {
              const dist = ball.position.distanceTo(new THREE.Vector3(target.position.x, target.position.y, target.position.z));
              if (dist < 2 && !target.userData.hit && ball.position.z < -2) {
                // HIT!
                target.userData.hit = true;
                const points = target.userData.points;
                setScore(prev => prev + points * (1 + combo * 0.1));
                setCombo(prev => prev + 1);
                
                // Visual feedback
                target.material.emissiveIntensity = 1;
                setTimeout(() => {
                  target.material.emissiveIntensity = 0.5;
                  target.userData.hit = false;
                  target.scale.setScalar(1);
                }, 500);
                
                // Reset ball
                ball.position.set(ball.userData.originalX, ball.userData.originalY, 0);
                ball.userData.velocity.set(0, 0, 0);
              }
            });
          }
          
          // Reset if out of bounds
          if (ball.position.y < -15 || ball.position.z < -20) {
            ball.position.set(ball.userData.originalX, ball.userData.originalY, 0);
            ball.userData.velocity.set(0, 0, 0);
            setCombo(0);
          }
          
          // Floor bounce
          if (ball.position.y < -8 && ball.position.z > -2) {
            ball.position.y = -8;
            ball.userData.velocity.y *= -0.5;
          }
        }
        
        ball.rotation.x += 0.01;
        ball.rotation.y += 0.01;
      });

      lastHandPosRef.current = { ...handPosRef.current };
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Initialize hand tracking
  useEffect(() => {
    let camera = null;
    let hands = null;

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const init = async () => {
      try {
        setStatus("Loading hand tracking...");

        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js');
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js');

        setStatus("Requesting camera...");

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, facingMode: 'user' }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        hands = new window.Hands({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.5
        });

        hands.onResults(onResults);

        camera = new window.Camera(videoRef.current, {
          onFrame: async () => {
            if (hands && videoRef.current) await hands.send({ image: videoRef.current });
          },
          width: 1280,
          height: 720
        });

        await camera.start();
        setStatus("🎯 Grab balls & throw at targets!");

      } catch (error) {
        console.error('Init error:', error);
        setStatus("Camera access required to play!");
      }
    };

    init();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const getDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  const onResults = useCallback((results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      setHandsDetected(1);
      const landmarks = results.multiHandLandmarks[0];

      drawHand(ctx, landmarks, canvas.width, canvas.height);

      const indexTip = landmarks[8];
      const thumbTip = landmarks[4];
      
      handPosRef.current = { 
        x: 1 - indexTip.x,
        y: indexTip.y 
      };

      const pinchDist = getDistance(indexTip, thumbTip);
      const isPinch = pinchDist < 0.07;
      setIsPinching(isPinch);

      if (isPinch && !lastPinchRef.current) {
        // Started pinching - grab nearest ball
        const handX = (handPosRef.current.x - 0.5) * 30;
        const handY = -(handPosRef.current.y - 0.5) * 20;

        let nearestBall = null;
        let nearestDist = 5;

        ballsRef.current.forEach((ball) => {
          if (!ball.userData.grabbed) {
            const dist = Math.sqrt(
              Math.pow(ball.position.x - handX, 2) +
              Math.pow(ball.position.y - handY, 2)
            );
            if (dist < nearestDist) {
              nearestDist = dist;
              nearestBall = ball;
            }
          }
        });

        if (nearestBall) {
          nearestBall.userData.grabbed = true;
          nearestBall.material.emissiveIntensity = 0.8;
          grabbedBallRef.current = nearestBall;
        }
      } else if (!isPinch && lastPinchRef.current && grabbedBallRef.current) {
        // Released - THROW!
        const ball = grabbedBallRef.current;
        ball.userData.grabbed = false;
        ball.material.emissiveIntensity = 0.3;
        
        // Apply throw velocity
        ball.userData.velocity.set(
          throwVelocityRef.current.x * 0.5,
          throwVelocityRef.current.y * 0.5 + 0.3,
          -1.5 // Always throw forward into targets
        );
        
        grabbedBallRef.current = null;
      }

      lastPinchRef.current = isPinch;

      // Draw grab indicator
      const handScreenX = (1 - ((indexTip.x + thumbTip.x) / 2)) * canvas.width;
      const handScreenY = ((indexTip.y + thumbTip.y) / 2) * canvas.height;
      
      ctx.beginPath();
      ctx.arc(handScreenX, handScreenY, isPinch ? 40 : 25, 0, 2 * Math.PI);
      ctx.fillStyle = isPinch ? 'rgba(255, 215, 0, 0.5)' : 'rgba(0, 255, 136, 0.2)';
      ctx.fill();
      ctx.strokeStyle = isPinch ? '#ffd700' : '#00ff88';
      ctx.lineWidth = 4;
      ctx.stroke();

    } else {
      setHandsDetected(0);
      if (grabbedBallRef.current) {
        grabbedBallRef.current.userData.grabbed = false;
        grabbedBallRef.current.material.emissiveIntensity = 0.3;
        grabbedBallRef.current = null;
      }
      lastPinchRef.current = false;
    }
  }, []);

  const drawHand = (ctx, landmarks, width, height) => {
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 8],
      [0, 9], [9, 10], [10, 11], [11, 12],
      [0, 13], [13, 14], [14, 15], [15, 16],
      [0, 17], [17, 18], [18, 19], [19, 20],
      [5, 9], [9, 13], [13, 17]
    ];

    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur = 15;
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 4;
    
    connections.forEach(([i, j]) => {
      ctx.beginPath();
      ctx.moveTo((1 - landmarks[i].x) * width, landmarks[i].y * height);
      ctx.lineTo((1 - landmarks[j].x) * width, landmarks[j].y * height);
      ctx.stroke();
    });

    ctx.shadowBlur = 0;

    landmarks.forEach((lm, idx) => {
      ctx.beginPath();
      ctx.arc((1 - lm.x) * width, lm.y * height, idx === 8 || idx === 4 ? 14 : 7, 0, 2 * Math.PI);
      ctx.fillStyle = idx === 8 || idx === 4 ? '#ffd700' : '#00ffff';
      ctx.fill();
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* Video feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1] opacity-50"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-green-900/30" />

      {/* Three.js container */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none" />

      {/* Hand tracking canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        width={typeof window !== 'undefined' ? window.innerWidth : 1280}
        height={typeof window !== 'undefined' ? window.innerHeight : 720}
      />

      {/* Weed Animation Overlay */}
      {showWeedAnimation && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Smoke effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent animate-pulse" />
          
          {/* Floating leaves */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-6xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              🌿
            </div>
          ))}
          
          {/* 420 text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl font-bold text-green-400 animate-pulse drop-shadow-[0_0_50px_rgba(34,197,94,0.8)]">
              420
            </div>
          </div>
          
          {/* Smoke clouds */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/20 to-transparent animate-pulse" />
        </div>
      )}

      {/* Achievement celebration particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-4xl pointer-events-none animate-fall"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `fall ${p.speed}s linear forwards`,
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Achievement Popup */}
      {achievement && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div 
            className={`px-8 py-6 font-bold text-2xl rounded-lg shadow-2xl border-4 ${
              achievement.type.includes('weed') 
                ? 'bg-green-900 border-green-400 text-green-400'
                : 'bg-amber-900 border-amber-400 text-amber-400'
            }`}
            style={{
              boxShadow: achievement.type.includes('weed') 
                ? '0 0 50px rgba(34, 197, 94, 0.8)'
                : '0 0 50px rgba(245, 158, 11, 0.8)'
            }}
          >
            <div className="text-6xl mb-2 text-center">{achievement.emoji}</div>
            <div className="text-center">{achievement.text}</div>
          </div>
        </div>
      )}

      {/* Score UI */}
      <div className="absolute top-4 left-4 z-40">
        <div className="bg-black/80 backdrop-blur border border-green-500/50 p-4">
          <p className="text-green-400 font-mono text-sm mb-2">{status}</p>
          
          <div className="flex gap-6 items-center mb-3">
            <div>
              <p className="text-[#555] text-xs font-mono">SCORE</p>
              <p className="text-4xl font-bold text-white">{Math.floor(score)}</p>
            </div>
            {combo > 0 && (
              <div className="animate-pulse">
                <p className="text-[#555] text-xs font-mono">COMBO</p>
                <p className="text-2xl font-bold text-yellow-400">x{combo} 🔥</p>
              </div>
            )}
          </div>
          
          <div className="flex gap-4 text-xs font-mono">
            <span className={handsDetected > 0 ? 'text-green-400' : 'text-red-400'}>
              {handsDetected > 0 ? '✋ Hand' : '👀 Show hand'}
            </span>
            <span className={isPinching ? 'text-yellow-400 font-bold' : 'text-[#555]'}>
              {isPinching ? '🤏 Grabbing!' : '✋ Open'}
            </span>
          </div>
        </div>
      </div>

      {/* Close button */}
      <div className="absolute top-4 right-4 z-40">
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-400 text-white px-6 py-3 font-bold text-lg transition-colors"
        >
          ✕ Exit
        </button>
      </div>

      {/* Target legend */}
      <div className="absolute top-4 right-24 z-40 hidden md:block">
        <div className="bg-black/80 backdrop-blur border border-white/20 p-3 text-xs font-mono">
          <p className="text-white mb-2">🎯 TARGETS</p>
          <p className="text-green-400">● Green = 10-20 pts</p>
          <p className="text-pink-400">● Pink = 25 pts</p>
          <p className="text-yellow-400">● Gold = 50 pts</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur border border-white/20 px-6 py-3 z-40">
        <div className="flex items-center gap-4 text-sm">
          <span>🎯 <span className="text-green-400">Grab balls</span></span>
          <span className="text-[#333]">→</span>
          <span>🤏 <span className="text-yellow-400">Aim & throw</span></span>
          <span className="text-[#333]">→</span>
          <span>🎯 <span className="text-pink-400">Hit targets</span></span>
          <span className="text-[#333]">→</span>
          <span>🌿 <span className="text-green-400">Get high scores!</span></span>
        </div>
      </div>

      {/* CSS for fall animation */}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall {
          animation: fall 3s linear forwards;
        }
      `}</style>
    </div>
  );
};
