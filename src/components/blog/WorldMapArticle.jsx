import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./article.css";

export const WorldMapArticle = () => {
  const navigate = useNavigate();
  const prevTheme = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    prevTheme.current = document.documentElement.getAttribute("data-theme") || "dark";
    document.documentElement.setAttribute("data-theme", "dark");
    return () => {
      if (prevTheme.current) {
        document.documentElement.setAttribute("data-theme", prevTheme.current);
      }
    };
  }, []);

  const handleBack = () => {
    if (prevTheme.current) {
      document.documentElement.setAttribute("data-theme", prevTheme.current);
    }
    navigate("/");
  };

  return (
    <div className="article-page theme-gold">
      <button onClick={handleBack} className="article-back-btn">
        ← Back
      </button>

      {/* HERO */}
      <header className="hero">
        <div className="hero-eyebrow">Engineering Deep Dive</div>
        <h1>
          Building a Cinematic Animated World Map in{" "}
          <em>React + SVG</em>
        </h1>
        <p className="hero-subtitle">
          Origin-to-destination arcs, traveling comets, pulsing radar HQ, and a
          dimmed real-world basemap — all in pure SVG with Framer Motion.
        </p>
        <div className="hero-meta">
          <span>📖 22 min read</span>
          <span>·</span>
          <span>Frontend Engineering</span>
          <span>·</span>
          <span>2026</span>
        </div>
        <div className="hero-divider"></div>
      </header>

      <div className="tags">
        {["React", "SVG", "Framer Motion", "Tailwind CSS", "Animation", "Data Visualization"].map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      {/* ARTICLE */}
      <article className="article">
        <p className="lead">
          The client needed a map showing global shipping routes radiating from a
          single HQ in Haryana, India. The requirement was specific: premium
          industrial-tech aesthetic, smooth, precision-engineered. Not flashy. A
          static map with dots wasn't going to cut it. We needed motion that
          communicated something — that India is the operational core powering a
          global supply network — without looking like a Web 2.0 dashboard demo.
        </p>

        <p>
          Here's how we built it, layer by layer. Every code snippet is
          production code you can lift and adapt.
        </p>

        {/* Product Video */}
        <div className="article-media">
          <video
            controls
            playsInline
            preload="metadata"
            poster="/blog/world-network.png"
            className="article-video"
          >
            <source src="/blog/world-map-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="media-caption">Strategic Global Hubs — Final Component Demo</p>
        </div>

        <div className="sep">· · ·</div>

        {/* SECTION 1 */}
        <h2>Architecture: Four Stacked Layers, One Coordinate System</h2>

        <p>
          The component is four layers stacked with{" "}
          <code>position: absolute</code>:
        </p>

        <div className="code-block" data-lang="tsx">
          <code>
{`<div className="relative aspect-[2000/857] w-full">
  {/* Layer 1: Dimmed basemap */}
  <img
    src="/world.svg"
    alt=""
    className="absolute inset-0 w-full h-full object-contain opacity-[0.16]
               [filter:invert(1)_grayscale(1)_brightness(1.4)]"
  />

  {/* Layer 2: Atmospheric glow under HQ */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: \`radial-gradient(
        ellipse 420px 320px at 70.9% 37.3%,
        rgba(244, 196, 0, 0.10) 0%,
        transparent 100%
      )\`,
    }}
  />

  {/* Layer 3: Network overlay — same viewBox as the basemap */}
  <svg viewBox="0 0 2000 857" className="absolute inset-0 w-full h-full"
    preserveAspectRatio="xMidYMid meet">
    <defs>{/* gradients, filters */}</defs>
    {/* arcs, nodes, labels */}
  </svg>

  {/* Layer 4: Vignette */}
  <div className="absolute inset-0 pointer-events-none
    bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(11,11,11,0.7)_100%)]"
  />
</div>`}
          </code>
        </div>

        <p>
          The critical decision: the network overlay SVG shares the{" "}
          <strong>exact same <code>viewBox</code></strong> (
          <code>0 0 2000 857</code>) as the basemap. Every hub is placed at its
          real-world coordinate within that space. No pixel-pushing, no
          responsive breakpoint math. Scale the container, everything scales with
          it.
        </p>

        <p>
          The basemap is the free{" "}
          <a href="https://simplemaps.com/resources/svg-maps" target="_blank" rel="noopener noreferrer">
            SimpleMaps world SVG
          </a>{" "}
          — 2000×857, MIT-licensed.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 2 */}
        <h2>Defining the Network Data</h2>

        <p>
          Two flat structures. One origin, one array of destinations:
        </p>

        <div className="code-block" data-lang="typescript">
          <code>
{`type Hub = {
  id: string;
  label: string;
  x: number;
  y: number;
  primary?: boolean;
};

const HQ: Hub = {
  id: "ind",
  label: "HARYANA · INDIA",
  x: 1418,
  y: 320,
  primary: true,
};

const DESTINATIONS: Hub[] = [
  { id: "nam", label: "NORTH AMERICA",  x: 488,  y: 250 },
  { id: "eu",  label: "EUROPE",         x: 1040, y: 200 },
  { id: "afr", label: "AFRICA",         x: 1110, y: 530 },
  { id: "jp",  label: "JAPAN",          x: 1780, y: 280 },
  { id: "oce", label: "OCEANIA",        x: 1820, y: 620 },
  { id: "me",  label: "MIDDLE EAST",    x: 1280, y: 330 },
  { id: "sea", label: "SE ASIA",        x: 1580, y: 430 },
  { id: "sa",  label: "SOUTH AMERICA",  x: 620,  y: 560 },
];`}
          </code>
        </div>

        <p>
          The <code>x</code> and <code>y</code> values are eyeballed against the
          basemap SVG. Because the overlay shares the viewBox, they line up
          perfectly at any container size.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 3 */}
        <h2>The Arcs: Distance-Aware Quadratic Bézier Curves</h2>

        <p>
          Straight lines on a map look like a UPS receipt. Curves look like
          flight paths.
        </p>

        <div className="code-block" data-lang="typescript">
          <code>
{`function arcPath(
  x1: number, y1: number,
  x2: number, y2: number,
  bend = 0.3
): string {
  const mx = (x1 + x2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const lift = Math.min(220, dist * bend);
  const my = Math.min(y1, y2) - lift;
  return \`M \${x1} \${y1} Q \${mx} \${my} \${x2} \${y2}\`;
}`}
          </code>
        </div>

        <p>
          The control point sits at the horizontal midpoint (<code>mx</code>),
          so the arch is symmetric. <code>lift</code> is proportional to the
          distance between endpoints — short hops get shallow arches,
          trans-Pacific routes soar.{" "}
          <code>Math.min(220, ...)</code> caps the lift so long routes don't
          disappear off the top of the viewport. Each destination gets a
          slightly different <code>bend</code> factor derived from a hash, so no
          two curves feel identical.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 4 */}
        <h2>The Four-Layer Stroke Technique</h2>

        <p>
          This is the single biggest reason the result looks expensive. Every
          route is rendered as <strong>four stacked SVG elements</strong>, not
          one.
        </p>

        <h3>SVG Definitions (Gradients and Filters)</h3>

        <div className="code-block" data-lang="tsx">
          <code>
{`<defs>
  {/* Soft blur for the glow layer */}
  <filter id="soft">
    <feGaussianBlur stdDeviation="3" />
  </filter>

  {/* Line gradient — fades to transparent at both ends */}
  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stopColor="#F4C400" stopOpacity="0.0" />
    <stop offset="20%"  stopColor="#F4C400" stopOpacity="0.55" />
    <stop offset="80%"  stopColor="#F4C400" stopOpacity="0.55" />
    <stop offset="100%" stopColor="#F4C400" stopOpacity="0.0" />
  </linearGradient>

  {/* HQ radial glow */}
  <radialGradient id="hqGlow" cx="50%" cy="50%" r="50%">
    <stop offset="0%"  stopColor="#F4C400" stopOpacity="0.35" />
    <stop offset="100%" stopColor="#F4C400" stopOpacity="0" />
  </radialGradient>
</defs>`}
          </code>
        </div>

        <p>
          The line gradient is the subtle touch that sells it — the endpoints
          fade to transparent, so the line <em>kisses</em> into the node dots
          instead of terminating with a hard edge.
        </p>

        <h3>The Four Layers Per Route</h3>

        <div className="code-block" data-lang="tsx">
          <code>
{`function RouteArc({ path, index, duration, delay }) {
  return (
    <g>
      {/* Layer 1: Soft outer glow */}
      <motion.path
        d={path}
        fill="none"
        stroke="#F4C400"
        strokeWidth={4}
        strokeOpacity={0.18}
        filter="url(#soft)"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.35 }}
        transition={{
          duration: 1.4,
          delay: 0.15 + index * 0.07,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Layer 2: Sharp core line with gradient stroke */}
      <motion.path
        d={path}
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{
          duration: 1.4,
          delay: 0.15 + index * 0.07,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Layer 3: Traveling dash — sliding bright segment */}
      <motion.path
        d={path}
        fill="none"
        stroke="#FFE066"
        strokeWidth={1.6}
        strokeLinecap="round"
        initial={{ strokeDasharray: "26 700", strokeDashoffset: 700 }}
        animate={{ strokeDashoffset: [700, -120] }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
      />

      {/* Layer 4: Comet head — circle riding animateMotion */}
      <circle r={3.2} fill="#FFE680" opacity={0}>
        <animateMotion
          dur={\`\${duration}s\`}
          repeatCount="indefinite"
          begin={\`\${delay}s\`}
          rotate="auto"
          path={path}
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.08;0.9;1"
          dur={\`\${duration}s\`}
          repeatCount="indefinite"
          begin={\`\${delay}s\`}
        />
      </circle>
    </g>
  );
}`}
          </code>
        </div>

        <div className="callout">
          <p>
            <strong>Why four layers?</strong> Drop any one and the magic
            collapses. The glow without the core looks foggy. The core without
            the glow looks flat. The dash without the comet looks mechanical.
            Layer composition — not a different library — is the gap between
            "functional" and "premium."
          </p>
        </div>

        <div className="sep">· · ·</div>

        {/* SECTION 5 */}
        <h2>Why <code>&lt;animateMotion&gt;</code> and Not Framer Motion for the Comets</h2>

        <p>
          Framer Motion handles the scroll-triggered draw-in (
          <code>pathLength: 0 → 1</code>) beautifully. But for continuously
          moving an element along an arbitrary path, native SVG{" "}
          <code>&lt;animateMotion&gt;</code> is the better tool:
        </p>

        <p>
          One declarative element, no JS execution per frame. GPU-composited by
          the browser. Runs at 60fps with zero{" "}
          <code>requestAnimationFrame</code> overhead.{" "}
          <code>rotate="auto"</code> follows the path tangent — useful if you
          swap the circle for an arrow glyph. The opacity{" "}
          <code>&lt;animate&gt;</code> element fades the comet in at 8% of each
          loop and out at 90%, so it doesn't pop in/out at the endpoints.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 6 */}
        <h2>Deterministic Pseudo-Random Timing</h2>

        <p>
          If every route pulses in sync, the brain reads "loop" and tunes out
          within seconds. We need organic timing variation — but{" "}
          <code>Math.random()</code> breaks SSR hydration (server and client
          generate different values).
        </p>

        <p>
          The fix is a tiny FNV-1a hash seeded on each destination's string ID:
        </p>

        <div className="code-block" data-lang="typescript">
          <code>
{`function seed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}`}
          </code>
        </div>

        <p>
          This returns a stable value in <code>[0, 1)</code> for any string.
          Same input always gives the same output — no hydration mismatch. We
          use it to derive per-route parameters:
        </p>

        <div className="code-block" data-lang="typescript">
          <code>
{`DESTINATIONS.map((dest, i) => {
  const r = seed(dest.id);
  const bend = 0.22 + r * 0.18;           // 0.22 → 0.40
  const duration = 6 + r * 3.5;           // 6.0s → 9.5s
  const delay = (i * 0.7 + r * 1.2) % 6;  // spread across 6s window

  const path = arcPath(HQ.x, HQ.y, dest.x, dest.y, bend);

  return (
    <RouteArc
      key={dest.id}
      path={path}
      index={i}
      duration={duration}
      delay={delay}
    />
  );
});`}
          </code>
        </div>

        <p>
          Every route gets its own curve shape, speed, and start time. Refresh
          the page — same organic feel, deterministic render.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 7 */}
        <h2>The HQ Node: Radar, Not Decoration</h2>

        <p>
          Destination nodes are straightforward — a halo, a pulse ring, a filled
          center. The HQ node needs to feel like a control center. It does five
          things simultaneously:
        </p>

        <div className="code-block" data-lang="tsx">
          <code>
{`function HQNode() {
  return (
    <g transform={\`translate(\${HQ.x} \${HQ.y})\`}>
      {/* a) Energy field */}
      <circle r={70} fill="url(#hqGlow)" />

      {/* b) Three concentric pulse rings, staggered */}
      {[0, 0.6, 1.2].map((d, i) => (
        <motion.circle
          key={i}
          r={9}
          fill="none"
          stroke="#F4C400"
          strokeWidth={1.5}
          style={{ transformOrigin: "center", transformBox: "fill-box" }}
          animate={{ scale: [1, 5.5], opacity: [0.85, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: d,
            ease: "easeOut",
          }}
        />
      ))}

      {/* c) Slow rotating dashed reticle */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "center", transformBox: "fill-box" }}
      >
        <circle r={16} fill="none" stroke="#F4C400"
          strokeWidth={0.6} strokeOpacity={0.5} strokeDasharray="4 6" />
        <circle r={24} fill="none" stroke="#F4C400"
          strokeWidth={0.4} strokeOpacity={0.3} strokeDasharray="2 8" />
      </motion.g>

      {/* d) Breathing core */}
      <motion.circle
        r={9}
        fill="#FFE066"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        style={{
          filter: "drop-shadow(0 0 14px rgba(244,196,0,0.95))",
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
      />
      <circle r={3} fill="#0B0B0B" />

      {/* e) Label */}
      <text y={50} textAnchor="middle" fill="#F4C400" fontSize={11}
        fontWeight={600} letterSpacing="2px" fontFamily="monospace">
        {HQ.label}
      </text>
    </g>
  );
}`}
          </code>
        </div>

        <p>
          The three pulse rings staggered at 0s, 0.6s, and 1.2s create a
          continuous heartbeat — there's always at least one ring expanding. The
          rotating dashed reticle completes one revolution every 24 seconds:
          slow enough to be ambient, fast enough to register subconsciously.
        </p>

        <h3>The <code>transform-box</code> Gotcha</h3>

        <p>
          This cost about an hour of debugging. SVG elements rotate and scale
          around <code>(0, 0)</code> by default — the top-left corner of the SVG
          canvas. Without these two CSS properties, pulse rings fly off to the
          corner of the viewport:
        </p>

        <div className="code-block" data-lang="css">
          <code>
{`transform-origin: center;
transform-box: fill-box;`}
          </code>
        </div>

        <p>
          <code>transform-box: fill-box</code> switches the transform reference
          from the SVG root to the element's own bounding box. Always add this
          when animating SVG circles or groups with Framer Motion.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 8 */}
        <h2>Destination Nodes</h2>

        <p>
          Simpler than HQ, but with the same layering philosophy:
        </p>

        <div className="code-block" data-lang="tsx">
          <code>
{`function DestinationNode({ hub }) {
  return (
    <g transform={\`translate(\${hub.x} \${hub.y})\`}>
      {/* Outer halo */}
      <circle r={18} fill="url(#hqGlow)" opacity={0.4} />

      {/* Pulse ring */}
      <motion.circle
        r={6}
        fill="none"
        stroke="#F4C400"
        strokeWidth={1}
        style={{ transformOrigin: "center", transformBox: "fill-box" }}
        animate={{ scale: [1, 3.5], opacity: [0.6, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* Core dot */}
      <circle r={4} fill="#F4C400"
        style={{ filter: "drop-shadow(0 0 6px rgba(244,196,0,0.7))" }} />
      <circle r={1.5} fill="#0B0B0B" />

      {/* Label */}
      <text y={-16} textAnchor="middle" fill="rgba(244,196,0,0.75)"
        fontSize={9} fontWeight={500} letterSpacing="1.5px"
        fontFamily="monospace">
        {hub.label}
      </text>
    </g>
  );
}`}
          </code>
        </div>

        <div className="sep">· · ·</div>

        {/* SECTION 9 */}
        <h2>The Basemap: Three CSS Filters Stacked</h2>

        <p>
          The world SVG is light gray by default. Three stacked CSS filters
          convert it into a phantom map on a dark background:
        </p>

        <div className="code-block" data-lang="html">
          <code>
{`<img
  src="/world.svg"
  alt=""
  className="absolute inset-0 w-full h-full object-contain
             opacity-[0.16]
             [filter:invert(1)_grayscale(1)_brightness(1.4)]"
/>`}
          </code>
        </div>

        <p>
          <code>invert(1)</code> flips the light map to dark, so it works on a
          black/near-black background. <code>grayscale(1)</code> strips any
          residual color from the source SVG.{" "}
          <code>brightness(1.4)</code> recovers contrast lost in the inversion.{" "}
          <code>opacity: 0.16</code> pushes the whole thing behind the network
          overlay. Visible enough to read continents. Faint enough to never
          compete with the animation.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 10 */}
        <h2>The Vignette</h2>

        <p>One line. Huge effect.</p>

        <div className="code-block" data-lang="tsx">
          <code>
{`<div
  className="absolute inset-0 pointer-events-none
    bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(11,11,11,0.7)_100%)]"
/>`}
          </code>
        </div>

        <p>
          The radial gradient fades the corners into the page background.
          Without this, the map looks like a rectangular screenshot pasted onto
          the page. With it, the edges dissolve and the component belongs to the
          layout.
        </p>

        <div className="sep">· · ·</div>

        {/* Thumbnail screenshot */}
        <div className="article-media">
          <img
            src="/blog/world-network.png"
            alt="Cinematic animated world map with golden arcs radiating from Haryana, India to global destinations"
            className="article-img"
          />
          <p className="media-caption">
            The finished component — golden arcs radiating from the HQ node,
            with comet particles traveling along each route
          </p>
        </div>

        <div className="sep">· · ·</div>

        {/* SECTION 11 */}
        <h2>Putting It All Together</h2>

        <div className="code-block" data-lang="tsx">
          <code>
{`"use client";

import { motion } from "framer-motion";

export default function WorldNetwork() {
  return (
    <div className="relative aspect-[2000/857] w-full mx-auto max-w-7xl">
      {/* Basemap */}
      <img src="/world.svg" alt=""
        className="absolute inset-0 w-full h-full object-contain
                   opacity-[0.16]
                   [filter:invert(1)_grayscale(1)_brightness(1.4)]" />

      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: \`radial-gradient(
            ellipse 420px 320px at \${(HQ.x / 2000) * 100}% \${(HQ.y / 857) * 100}%,
            rgba(244, 196, 0, 0.10) 0%, transparent 100%
          )\`,
        }} />

      {/* Network SVG */}
      <svg viewBox="0 0 2000 857"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="soft"><feGaussianBlur stdDeviation="3" /></filter>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F4C400" stopOpacity="0.0" />
            <stop offset="20%" stopColor="#F4C400" stopOpacity="0.55" />
            <stop offset="80%" stopColor="#F4C400" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#F4C400" stopOpacity="0.0" />
          </linearGradient>
          <radialGradient id="hqGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4C400" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F4C400" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Routes, Destination nodes, HQ node */}
        {DESTINATIONS.map((dest, i) => {
          const r = seed(dest.id);
          const path = arcPath(HQ.x, HQ.y, dest.x, dest.y, 0.22 + r * 0.18);
          return <RouteArc key={dest.id} path={path} index={i}
            duration={6 + r * 3.5} delay={(i * 0.7 + r * 1.2) % 6} />;
        })}
        {DESTINATIONS.map((d) => <DestinationNode key={d.id} hub={d} />)}
        <HQNode />
      </svg>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none
        bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(11,11,11,0.7)_100%)]" />
    </div>
  );
}`}
          </code>
        </div>

        <div className="sep">· · ·</div>

        {/* SECTION 12 */}
        <h2>Performance</h2>

        <p>
          A few things that keep this at 60fps:
        </p>

        <p>
          <strong>Everything is SVG.</strong> No canvas context, no WebGL setup.
          The browser composites SVG paths cheaply.
        </p>

        <p>
          <strong><code>&lt;animateMotion&gt;</code> is native.</strong> The
          comet loops run with zero JS overhead — GPU-composited by the browser.
        </p>

        <p>
          <strong><code>pathLength</code> animations are GPU-accelerated</strong>{" "}
          via <code>stroke-dashoffset</code> under the hood.
        </p>

        <p>
          <strong>No <code>box-shadow</code> on animated elements.</strong> We
          use <code>drop-shadow</code> filters only on small static circles.{" "}
          <code>box-shadow</code> on an animating element triggers per-frame
          paint; <code>drop-shadow</code> is GPU-composited.
        </p>

        <p>
          <strong><code>viewport={"{{ once: true }}"}</code></strong> on draw-in
          animations means they fire exactly once. After the initial reveal, the
          only ongoing motion is the looping comets.
        </p>

        <p>
          <strong>Bundle cost:</strong> ~3KB gzipped for the entire component.
          Compare that to a Lottie file or an embedded video.
        </p>

        <div className="callout">
          <p>
            <strong>Accessibility note:</strong>{" "}
            <code>prefers-reduced-motion</code> isn't handled in these snippets.
            In production, check the media query in a <code>useEffect</code> and
            conditionally render a static version with all routes drawn but no
            looping animations.
          </p>
        </div>

        <div className="sep">· · ·</div>

        {/* SECTION 13 */}
        <h2>Takeaways</h2>

        <p>
          Three principles that generalize beyond this component:
        </p>

        <p>
          <strong>Layer your strokes.</strong> A single colored SVG path is a
          line. A wide blurred glow + a thin gradient core + a sliding dash + a
          glowing comet is a <em>route</em>. The gap between "functional" and
          "premium" is almost always layer composition — not a different library.
        </p>

        <p>
          <strong>Hash your timings.</strong>{" "}
          <code>Math.random()</code> is unstable across SSR/CSR boundaries. A
          deterministic hash of a stable ID gives you organic variation without
          hydration bugs. This applies to any looping animation in a
          server-rendered React app.
        </p>

        <p>
          <strong>Use the same coordinate system as your reference.</strong>{" "}
          Sharing the basemap's <code>viewBox</code> meant every hub placement
          was just its real-world map coordinate. No responsive calculations. No
          breakpoint-specific position arrays. One coordinate system, any screen
          size.
        </p>

        <div className="pull-quote">
          The whole component is ~280 lines of TypeScript. No mapping library.
          No canvas. No video file. Pure SVG primitives, composed with
          intention. That's usually where the gap is.
        </div>

        <div className="sep">· · ·</div>

        <div className="author-card">
          <div className="author-avatar">WM</div>
          <div className="author-info">
            <div className="author-name">Strategic Global Hubs</div>
            <div className="author-bio">
              A cinematic animated world map component — origin-to-destination
              arcs with traveling comets, pulsing radar HQ, and a dimmed
              real-world basemap. Built with React, SVG, and Framer Motion.
            </div>
          </div>
        </div>
      </article>

      <footer className="article-footer">
        Written with care · Powered by curiosity and the conviction that SVG is
        still underrated
      </footer>
    </div>
  );
};
