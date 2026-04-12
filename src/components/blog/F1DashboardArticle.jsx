import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./article.css";

export const F1DashboardArticle = () => {
  const navigate = useNavigate();
  const prevTheme = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Remember user's theme and force light for article
    prevTheme.current = document.documentElement.getAttribute("data-theme") || "dark";
    document.documentElement.setAttribute("data-theme", "light");
    return () => {
      // Restore user's theme when leaving
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
    <div className="article-page">
      {/* Back button */}
      <button onClick={handleBack} className="article-back-btn">
        ← Back
      </button>

      {/* HERO */}
      <header className="hero">
        <div className="hero-eyebrow">Engineering Deep Dive</div>
        <h1>
          I Built an F1 Race Intelligence Dashboard — Here's{" "}
          <em>Everything</em> I Learned
        </h1>
        <p className="hero-subtitle">
          From GPS telemetry to spring-physics cameras, AI race engineers to
          voice commentary — the story of turning raw Formula 1 data into a
          living, breathing war room.
        </p>
        <div className="hero-meta">
          <span>📖 28 min read</span>
          <span>·</span>
          <span>Full-Stack Engineering</span>
          <span>·</span>
          <span>2026</span>
        </div>
        <div className="hero-divider"></div>
      </header>

      <div className="tags">
        {["Next.js", "FastAPI", "WebSockets", "Claude AI", "ElevenLabs", "GSAP", "Formula 1", "Real-Time Systems"].map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      {/* ARTICLE */}
      <article className="article">
        <p className="lead">
          Formula 1 generates a staggering volume of data every race weekend —
          telemetry streaming at 300Hz from 20 cars, timing data measured to
          thousandths of a second, strategic decisions unfolding in real time.
          The official F1 timing app gives you tables. I wanted something
          radically different: a{" "}
          <strong>visual intelligence dashboard</strong> that makes you{" "}
          <em>feel</em> the race happening.
        </p>

        <p>
          The result is <strong>F1 Intelligence Studio</strong> — a full-stack
          application where animated driver markers chase each other around a
          telemetry-derived SVG circuit, an AI race engineer delivers tactical
          insights, a camera system zooms into battles with spring-damper
          physics, and you can replay any moment of the race with frame-perfect
          scrubbing. It has twelve customizable panels, a voice commentary
          system powered by ElevenLabs, and a strategy simulator that tells you
          whether a driver should pit or stay out.
        </p>

        <p>
          This article is the full engineering story — every interesting
          problem, every elegant (and not-so-elegant) solution, and the
          architectural decisions behind them. Let's get into it.
        </p>

        {/* Product Video */}
        <div className="article-media">
          <video
            controls
            playsInline
            preload="metadata"
            poster="/blog/f1-broadcast.png"
            className="article-video"
          >
            <source src="/blog/raceos-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="media-caption">F1 Intelligence Studio — Product Demo</p>
        </div>

        <div className="sep">· · ·</div>

        {/* SECTION 1 */}
        <h2>Drawing a Circuit from GPS Data</h2>

        <p>
          The first challenge was deceptively fundamental:{" "}
          <strong>how do you render an F1 circuit programmatically?</strong> I
          didn't want static SVG files — I wanted the track shape to emerge
          directly from real telemetry, the actual path a car drove during the
          fastest lap. Every circuit becomes a faithful rendering from GPS
          coordinates, not an artist's approximation.
        </p>

        <h3>Extracting the Path</h3>

        <p>
          FastF1, the Python library for F1 data, provides access to telemetry
          from any session. The approach is to grab the fastest lap and extract
          its position data — raw X/Y coordinates in meters from the circuit's
          local coordinate system. These raw coordinates then get projected into
          an SVG viewBox using <strong>uniform scaling</strong> — both axes
          share the same scale factor — to preserve the circuit's true aspect
          ratio. Everything normalizes into a 0–1000 coordinate space with 50
          pixels of padding.
        </p>

        <div className="code-block" data-lang="python">
          <code>
{`# Uniform scaling preserves the track's true geometry
scale = max(x_range, y_range)
x_norm = ((x - x_min) / scale * 900 + 50).tolist()
y_norm = ((y - y_min) / scale * 900 + 50).tolist()`}
          </code>
        </div>

        <h3>The 1,000-Point Sampling Trick</h3>

        <p>
          Here's where it gets clever. Raw telemetry points are{" "}
          <strong>unevenly spaced</strong> — the car slows in corners (points
          cluster together) and accelerates on straights (points spread apart).
          If you used these directly for positioning, a car at "50% around the
          track" would be at the array's midpoint, not the track's geometric
          midpoint.
        </p>

        <p>
          The solution: resample the SVG path into{" "}
          <span className="num-highlight">1,000</span> equally-spaced points by
          exploiting the browser's built-in SVG geometry engine. Mount an
          invisible <code>&lt;path&gt;</code> element, call{" "}
          <code>getPointAtLength()</code> across its total length, and you get a
          uniform lookup table. Now <code>samples[500]</code> is exactly the
          track's midpoint, and finding any position is <strong>O(1)</strong>{" "}
          with linear interpolation between the two nearest samples.
        </p>

        <div className="callout">
          <p>
            <strong>Key insight:</strong> This 1,000-point array is the
            foundation for everything — car animation, camera tracking, overtake
            visualization, pit lane offsets. Every spatial feature in the entire
            application is just a lookup into this single data structure.
          </p>
        </div>

        <div className="sep">· · ·</div>

        {/* SECTION 2 */}
        <h2>Animating 20 Cars at 60fps</h2>

        <p>
          This is arguably the most performance-critical code in the entire
          application. Twenty driver markers need to move smoothly around the
          circuit at 60 frames per second, responding to real-time gap data, pit
          stops, and position changes. The naive approach — updating React state
          60 times per second for 20 drivers — would bring the browser to its
          knees.
        </p>

        <h3>Zero React Re-renders in the Hot Path</h3>

        <p>
          The entire animation loop runs{" "}
          <strong>outside React's reconciliation cycle.</strong> All driver
          positions are stored in <code>useRef</code> objects, and DOM updates
          happen through direct <code>setAttribute</code> calls. React state
          updates are throttled to 500ms and reserved only for non-critical UI
          like the bottom bar's driver badges. The animation itself is a{" "}
          <code>requestAnimationFrame</code> loop that touches only refs and raw
          DOM.
        </p>

        <div className="code-block" data-lang="typescript">
          <code>
{`// Direct DOM manipulation — React never sees this
const carGroup = svg.getElementById(\`car-\${slot.driver}\`);
carGroup.setAttribute(
  "transform",
  \`translate(\${drawX.toFixed(1)}, \${drawY.toFixed(1)})\`
);`}
          </code>
        </div>

        {/* Broadcast screenshot */}
        <div className="article-media">
          <img
            src="/blog/f1-broadcast.png"
            alt="F1 Intelligence Studio — Broadcast Mode with live track map and leaderboard"
            className="article-img"
          />
          <p className="media-caption">
            Broadcast Mode — Live track map with animated driver markers,
            leaderboard, and strategy panels
          </p>
        </div>

        <h3>The Position Formula</h3>

        <p>
          Each car's position is a float between 0 and 1. The formula converts a
          gap in seconds into a fraction of the track: if a driver is 1.2
          seconds behind the leader and the average lap is 90 seconds, they're
          placed 1.33% of the track behind. Exponential smoothing with a factor
          of <span className="num-highlight">0.03</span> eases position changes
          into place over roughly 30 frames, preventing jarring jumps.
        </p>

        <h3>The Pit Lane Illusion</h3>

        <p>
          When a driver enters the pits, the dot gets pushed{" "}
          <strong>perpendicular to the track direction</strong> by 35 pixels.
          Take the direction vector from the current point to a point slightly
          ahead, rotate it 90°, offset by 35px. The math is simple vector
          rotation, and the result is a surprisingly convincing pit lane that
          runs alongside the circuit — no second SVG path required.
        </p>

        <div className="pull-quote">
          React's reconciliation cycle has no business in a 60fps animation
          loop. Direct DOM manipulation via useRef is the right tool when you
          need guaranteed frame timing.
        </div>

        <div className="sep">· · ·</div>

        {/* SECTION 3 */}
        <h2>A Spring-Damper Camera That Feels Like a Broadcast</h2>

        <p>
          Real F1 broadcasts have a distinctive camera quality — the shot
          follows the action but with a smooth, weighted feel. It doesn't snap
          to targets; it <em>glides</em>. I wanted that same sensation, and I
          deliberately chose not to use GSAP or CSS transitions. Spring-damper
          physics gives a more organic quality because the motion depends on{" "}
          <strong>velocity</strong>, not just position.
        </p>

        <p>
          The camera accelerates toward its target, overshoots slightly, and
          settles — like a real camera rig with inertia. The system has a spring
          stiffness of <span className="num-highlight">0.045</span> and a
          damping factor of <span className="num-highlight">0.82</span>,
          normalized against frame timing so the motion feels identical at 30fps
          or 144fps.
        </p>

        <div className="code-block" data-lang="typescript">
          <code>
{`// Spring force pulls toward target; damping decays velocity
vx += (targetX - x) * SPRING * dtNorm;
vy += (targetY - y) * SPRING * dtNorm;
vx *= DAMPING;
vy *= DAMPING;
x += vx * dtNorm;
y += vy * dtNorm;`}
          </code>
        </div>

        <h3>Dynamic Battle Zoom</h3>

        <p>
          When two drivers are battling, the camera automatically zooms in. The
          zoom level is inversely proportional to their separation —
          wheel-to-wheel combat magnifies up to 3x, and as drivers separate, it
          pulls back. Everything flows through the spring system, so zoom
          changes feel smooth and physical rather than stepwise.
        </p>

        <h3>The AI Director</h3>

        <p>
          A priority-based scoring system — inspired by actual TV direction —
          decides what the camera follows. Events are scored by type (incidents
          highest, then battles, then overtakes), boosted by severity, given a
          continuity bonus if the camera is already tracking nearby, and
          penalized to suppress repetition. Each event has a minimum hold time —
          8 seconds for incidents, 6 for battles — preventing the frantic
          camera-switching that would make the visualization unwatchable.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 4 */}
        <h2>The Math Behind Gap Visualization</h2>

        <p>
          In F1, gaps between drivers are measured in <em>seconds</em>, not
          meters. "Verstappen leads Hamilton by 1.234 seconds" means Hamilton
          crossed the timing line 1.234 seconds later. But how do you visualize
          seconds as spatial distance on a 2D circuit?
        </p>

        <p>
          The conversion is elegant:{" "}
          <code>visual_offset = gap_seconds / average_lap_time</code>. If the
          average lap is 90 seconds and the gap is 1.234s, the trailing driver
          sits 1.37% of the track behind the leader. On our 1,000-point array,
          that's about 14 sample points — clearly visible separation on screen.
          Gaps are computed from cumulative lap completion times, exactly how
          real F1 timing works. A driver who had one slow lap 20 laps ago still
          carries that time deficit.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 5 */}
        <h2>Detecting Overtakes with Sub-Lap Precision</h2>

        <p>
          If a driver was P3 on lap 15 and P2 on lap 16, an overtake happened{" "}
          <em>somewhere</em> during that lap. But where? Having overtakes snap
          at lap boundaries feels robotic. The solution: use the change in
          gap-to-leader to estimate when the pass occurred within the lap.
        </p>

        <p>
          The intuition is that if a driver's gap dropped dramatically, they
          probably made the pass early (the rest of the lap accumulated their
          new position's advantage). If the gap barely changed, the pass
          happened near the end. This gives sub-lap precision — overtakes
          distribute realistically across the animation timeline rather than all
          bunching at lap boundaries.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 6 — Analysis screenshot */}
        <h2>AI Insights: Rule Engine Meets Claude</h2>

        <p>
          The AI panel doesn't just throw data at an LLM and hope for the best.
          It uses a <strong>two-layer system</strong>. Deterministic rules fire
          first — simple heuristics that catch tyre degradation, pace drops, and
          undercut opportunities instantly, no API call needed. Then these
          detected patterns get bundled with a compact race snapshot and sent to
          Claude, which enhances and contextualizes them with a race engineer's
          expertise.
        </p>

        <div className="code-block" data-lang="python">
          <code>
{`# Layer 1: Instant heuristic detection
# - Tyre deg: avg lap time increasing >0.3s/lap on 15+ lap old tyres
# - Pace drop: lap time jumps >1.0s over any 3-lap window
# - Undercut: fresh tyres within 2 positions of old-tyre driver

# Layer 2: Claude enhances with strategic context
# Compact payload → 600 max tokens → dashboard-appropriate response`}
          </code>
        </div>

        {/* Analysis screenshot */}
        <div className="article-media">
          <img
            src="/blog/f1-analysis.png"
            alt="F1 Intelligence Studio — Analysis Mode with telemetry, gap evolution, and strategy panels"
            className="article-img"
          />
          <p className="media-caption">
            Analysis Mode — Telemetry comparison, gap evolution chart, events
            replay, and strategy simulator
          </p>
        </div>

        <p>
          The race engineer persona is deliberately concise and data-driven —
          this is a live dashboard, not a blog post. Claude references specific
          drivers, positions, and lap numbers, and expresses confidence levels
          when making predictions. The chat feature appends full race context to
          every user question, so asking "who should pit next?" gives Claude the
          complete picture.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 7 */}
        <h2>Strategy Simulator: Pit or Stay Out?</h2>

        <p>
          Each tyre compound has characteristic parameters — pace deltas and
          degradation rates. The simulator runs two scenarios: "pit now"
          (absorb the ~23-second pit stop loss, then gain from fresh tyres)
          versus "stay out" (avoid the stop but suffer accelerating
          degradation). A non-linear factor models the feared "tyre cliff" where
          performance drops sharply on old rubber.
        </p>

        <p>
          The position change heuristic assumes exiting the pits costs roughly 2
          positions, and each 3-second advantage gained recovers approximately 1
          position. With a ±2 second threshold, the system recommends PIT, STAY
          OUT, or MARGINAL. It's a simplification compared to actual F1 strategy
          models, but it captures the fundamental trade-off and gives users
          meaningful, intuitive insight.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 8 */}
        <h2>ElevenLabs Voice: Making the Dashboard Speak</h2>

        <p>
          The most viscerally satisfying feature: the dashboard <em>talks</em>.
          The ElevenLabs multilingual v2 model is configured with an extreme
          combination — very low stability (
          <span className="num-highlight">0.15</span>) for dramatic,
          broadcast-like vocal variation, paired with high similarity boost (
          <span className="num-highlight">0.9</span>) to keep it sounding like
          the same commentator. Each utterance sounds slightly different, like a
          real person reacting in the moment.
        </p>

        <p>
          A 3-item queue prevents voice backlog during rapid events.
          Auto-commentary speaks the top insight every 30 seconds, and special
          flags — safety car, red flag — trigger immediate announcements. One
          unexpected problem: AI-generated text sometimes contains emoji, which
          ElevenLabs either skips (creating unnatural pauses) or tries to
          vocalize. The fix is a regex that strips the entire Unicode
          supplementary plane before TTS processing.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 9 */}
        <h2>Real-Time Architecture</h2>

        <p>
          The data pipeline is WebSockets all the way down. A Python race
          simulator driven by a simple clock determines the current lap. On each
          lap change, the backend fetches the full payload — leaderboard,
          positions, insights, race control messages — and broadcasts it to all
          connected clients. Between laps, lightweight state updates keep the
          animation ticking.
        </p>

        <div className="arch-diagram">
          <pre>
{`  RaceSimulator (Python)
      │ elapsed_time / speed = current_lap
      ▼
  start_live_broadcast() — async loop
      │ on lap change → fetch full payload
      ▼
  ConnectionManager.broadcast() → JSON → WebSocket clients
      ▼
  useRaceWebSocket.onmessage → Zustand store dispatch
      ▼
  Components (ref-based animation + throttled React state)`}
          </pre>
        </div>

        <p>
          State management uses Zustand — a flat store with around 30 fields and
          action methods. No middleware, no normalized entities. For real-time
          data that gets completely replaced every second, the overhead of
          Redux's immutable update patterns and selector memoization is pure
          waste. Zustand's minimal footprint is the right match.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 10 */}
        <h2>Timeline Replay with a Ring Buffer</h2>

        <p>
          The replay system allows scrubbing through any point in the race. The
          timeline is modeled as a continuous float — <code>raceProgress = 10.456</code>{" "}
          means "lap 11, 45.6% through." At 1x speed, each lap takes 12 real
          seconds; at 10x, 1.2 seconds.
        </p>

        <p>
          Every 500ms, a snapshot of the entire race state is recorded into a
          ring buffer of <span className="num-highlight">10,000</span> frames —
          enough for roughly 83 minutes of race time. Each frame stores the race
          progress timestamp, driver positions, and full leaderboard state.
          Seeking scans backward from the write head for good locality on the
          common case (seeking near the current time), with graceful degradation
          for distant seeks.
        </p>

        <div className="sep">· · ·</div>

        {/* Baku screenshot */}
        <div className="article-media">
          <img
            src="/blog/f1-baku.png"
            alt="F1 Intelligence Studio — Baku City Circuit with battle detection, AI insights, and telemetry"
            className="article-img"
          />
          <p className="media-caption">
            Baku City Circuit — Battle detection, yellow flag handling, AI
            insights panel, and telemetry overlay
          </p>
        </div>

        <div className="sep">· · ·</div>

        {/* SECTION 11 */}
        <h2>Deployment: The Hard Parts Nobody Warns You About</h2>

        <p>
          Deployment was deceptively complex. The Railway Dockerfile saga alone
          involved three separate failures: path resolution (paths resolve from
          the repository root, not the config directory), build context
          (monorepo root means your <code>COPY</code> commands need full
          paths), and the infamous <code>$PORT</code> mystery — Railway's{" "}
          <code>startCommand</code> doesn't run through a shell, so environment
          variables are treated as literal strings.
        </p>

        <p>
          Then came CORS battles between the Vercel frontend and Railway
          backend. And the most frustrating challenge of all: YouTube's Content
          ID system. F1 highlight videos worked perfectly locally but showed
          "Video unavailable" in production. Formula One Management blocks all
          race footage from being embedded on third-party domains — and the API
          reports them as embeddable, with the block applied at the domain level{" "}
          <em>after</em> the embed loads.
        </p>

        <p>
          After three failed approaches (iframe embeds, API filtering,
          scraping), the solution was a 3-tier system: Dailymotion embeds for
          race highlights (FOM doesn't police it as aggressively), YouTube for
          non-blocked content like tech analysis videos, and thumbnail cards
          with external links for actual race footage.
        </p>

        <div className="callout">
          <p>
            <strong>The lesson:</strong> Sometimes the hardest engineering
            problem isn't engineering at all — it's understanding the legal and
            copyright landscape. More time was spent fighting YouTube's Content
            ID than building the entire video panel.
          </p>
        </div>

        <div className="sep">· · ·</div>

        {/* SECTION 12 */}
        <h2>The Grid Layout — A Drag-and-Drop War Room</h2>

        <p>
          The dashboard uses <code>react-grid-layout</code> with a 24-column
          grid at 30px row height, enabling fine-grained control over twelve
          different panels — from the SVG track map and real-time leaderboard to
          the strategy simulator and AI insights. Two preset layouts offer
          different perspectives: Broadcast mode (large circuit center stage)
          and Analysis mode (expanded telemetry and strategy panels).
        </p>

        <p>
          Layout state persists to localStorage, and panel visibility is managed
          through a separate Zustand store. Every panel is wrapped in a{" "}
          <code>&lt;PanelWrapper&gt;</code> with drag handles and an{" "}
          <code>&lt;ErrorBoundary&gt;</code>, so a crash in one panel never
          takes down the others.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 13 */}
        <h2>Architecture at a Glance</h2>

        <div className="arch-diagram">
          <pre>
{`  ┌────────────────────────┐       ┌──────────────────────────────┐
  │     Vercel (Free)       │       │     Railway (~$5/mo)         │
  │                         │       │                              │
  │  Next.js 14 + TS        │◄─────►│  FastAPI + Python 3.12       │
  │  Zustand State          │ REST  │  FastF1 Data Extraction      │
  │  GSAP Animations        │  +    │  Anthropic Claude API        │
  │  Recharts Graphs        │  WS   │  ElevenLabs TTS API          │
  │  react-grid-layout      │       │  YouTube / Dailymotion APIs  │
  └────────────────────────┘       └──────────────────────────────┘`}
          </pre>
        </div>

        <p>
          The backend exposes <span className="num-highlight">56</span> FastAPI
          endpoints with auto-generated Swagger documentation. A background sync
          job checks for new race data every 5 minutes and pre-caches it, so
          most API calls are served instantly from cache.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 14 — Credits */}
        <h2>Credits &amp; Acknowledgements</h2>

        <p>
          This project stands on the shoulders of some incredible open-source
          projects and APIs. A huge shoutout to the communities behind them.
        </p>

        <h3>The F1 Data Layer</h3>

        <p>
          <strong>
            <a href="https://github.com/theOehrly/Fast-F1" target="_blank" rel="noopener noreferrer">FastF1</a>
          </strong>{" "}
          — The backbone of the entire backend. Theehrly's FastF1 library
          provides access to F1 timing data, telemetry, and session results with
          a clean Pandas-based API. Without it, extracting lap times, position
          data, tyre compounds, and car telemetry (speed, throttle, brake at
          300Hz!) would have required months of reverse-engineering. The track map
          rendering, gap calculations, strategy simulator, and telemetry charts all
          start with a FastF1 <code>session.load()</code> call.
        </p>

        <p>
          <strong>
            <a href="https://openf1.org" target="_blank" rel="noopener noreferrer">OpenF1</a>
          </strong>{" "}
          — A free, open-source, community-maintained API for real-time and
          historical F1 data. No API key required. Used for session listings,
          driver info, and as the primary data source for the background sync
          service.
        </p>

        <p>
          <strong>
            <a href="https://rapidapi.com/api-sports/api/f1-live-motorsport-data" target="_blank" rel="noopener noreferrer">
              F1 Live Motorsport Data (RapidAPI)
            </a>
          </strong>{" "}
          — Supplements OpenF1 with real-time timing, positions, race control
          messages, pit stops, and team radio during live sessions.
        </p>

        <h3>The Frontend Stack</h3>

        <p>
          <strong>
            <a href="https://github.com/pmndrs/zustand" target="_blank" rel="noopener noreferrer">Zustand</a>
          </strong>{" "}
          — Flat, minimal, zero-boilerplate state management that just gets out
          of the way. Perfect for real-time data where you're replacing state 60
          times per second.
        </p>

        <p>
          <strong>
            <a href="https://gsap.com/" target="_blank" rel="noopener noreferrer">GSAP</a>
          </strong>{" "}
          — Powers the cinematic lab entry animation, stroke-dashoffset track
          drawing, and various UI transitions.
        </p>

        <p>
          <strong>
            <a href="https://recharts.org/" target="_blank" rel="noopener noreferrer">Recharts</a>
          </strong>{" "}
          — The telemetry comparison charts (speed, throttle, brake), gap
          evolution, and stint visualizations. Handles 500+ data points per chart
          without breaking a sweat.
        </p>

        <p>
          <strong>
            <a href="https://github.com/react-grid-layout/react-grid-layout" target="_blank" rel="noopener noreferrer">
              react-grid-layout
            </a>
          </strong>{" "}
          — Makes the entire dashboard drag-and-drop customizable. The responsive
          breakpoint system and layout persistence were critical for the "war
          room" feel.
        </p>

        <h3>The AI &amp; Voice Layer</h3>

        <p>
          <strong>
            <a href="https://www.anthropic.com/" target="_blank" rel="noopener noreferrer">Anthropic Claude</a>
          </strong>{" "}
          — Claude Sonnet powers the AI insights engine and interactive chat. The
          race engineer persona, with its concise, data-driven style, was shaped
          by prompt engineering against Claude's strengths.
        </p>

        <p>
          <strong>
            <a href="https://elevenlabs.io/" target="_blank" rel="noopener noreferrer">ElevenLabs</a>
          </strong>{" "}
          — The multilingual v2 model with aggressive style settings gives the
          voice commentary its broadcast quality. The "Sarah" voice with 0.15
          stability is <em>chef's kiss</em>.
        </p>

        <h3>The Backend &amp; Infrastructure</h3>

        <p>
          <strong>
            <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer">FastAPI</a>
          </strong>{" "}
          — 56 endpoints with auto-generated Swagger docs, WebSocket support, and
          async everything.
        </p>

        <p>
          <strong>
            <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" rel="noopener noreferrer">yt-dlp</a>
          </strong>{" "}
          — Used as a fallback video search engine when the YouTube Data API quota
          runs dry. The flat-search mode extracts video metadata without
          downloading anything.
        </p>

        <p>
          <strong>
            <a href="https://developer.dailymotion.com/" target="_blank" rel="noopener noreferrer">
              Dailymotion API
            </a>
          </strong>{" "}
          — Free, no API key, and FOM doesn't police it. The unsung hero of the
          video highlights panel.
        </p>

        <p className="lead" style={{ fontSize: "1.05rem", fontStyle: "italic", color: "#888" }}>
          Special thanks to the broader F1 open-data community — the people
          documenting telemetry formats, maintaining free APIs, and building tools
          that make F1 data accessible to developers. This project exists because
          of you.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 15 — Lessons */}
        <h2>Lessons Learned</h2>

        <p>
          <strong>The browser's SVG engine is free compute.</strong> Using{" "}
          <code>getPointAtLength()</code> for curve sampling saved implementing
          custom Bézier math. The browser already has world-class geometry code
          — mount an invisible element, query it, remove it. Unorthodox but
          remarkably effective.
        </p>

        <p>
          <strong>Spring physics beat tweens for cameras.</strong> GSAP and CSS
          transitions interpolate between two endpoints. Spring-damper systems
          generate motion that <em>feels</em> physical — the camera
          decelerates, overshoots, settles. The math is equally simple, but the
          result is dramatically more natural.
        </p>

       

        <div className="sep">· · ·</div>

        <p>
          If you're interested in the code, the full project is on GitHub. Built
          with Next.js, FastAPI, FastF1, Claude, and ElevenLabs. Got questions,
          feedback, or suggestions? I'd love to hear them.
        </p>

        <div className="github-cta">
          <a
            href="https://github.com/nilamadhab47/raceosf1"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            View Source on GitHub
          </a>
        </div>

        <div className="author-card">
          <div className="author-avatar">F1</div>
          <div className="author-info">
            <div className="author-name">F1 Intelligence Studio</div>
            <div className="author-bio">
              A real-time Formula 1 operations dashboard — live circuit
              visualization, AI race analysis, spring-physics camera, and voice
              commentary. Built with Next.js, FastAPI, and Claude.
            </div>
          </div>
        </div>
      </article>

      <footer className="article-footer">
        Written with care · Powered by curiosity and too many late-night
        qualifying sessions
      </footer>
    </div>
  );
};
