import { useNavigate } from "react-router-dom";
import { RevealOnScroll } from "../RevealOnScroll";

const featuredBlog = {
  id: "f1-intelligence-dashboard",
  number: "01",
  title: "I Built an F1 Race Intelligence Dashboard",
  subtitle: "Here's Everything I Learned",
  description:
    "From GPS telemetry to spring-physics cameras, AI race engineers to voice commentary — the story of turning raw Formula 1 data into a living, breathing war room.",
  tags: ["Next.js", "FastAPI", "WebSockets", "Claude AI", "ElevenLabs", "GSAP", "Formula 1"],
  readTime: "28 min read",
  date: "2026",
  image: "/blog/f1-broadcast.png",
};

const articles = [
  {
    id: "cinematic-world-map",
    number: "02",
    title: "Building a Cinematic Animated World Map",
    subtitle: "React + SVG, No Libraries Required",
    description:
      "Origin-to-destination arcs, traveling comets, pulsing radar HQ, and a dimmed real-world basemap — all in pure SVG with Framer Motion.",
    tags: ["React", "SVG", "Framer Motion", "Tailwind CSS", "Animation"],
    readTime: "22 min read",
    date: "2026",
    image: "/blog/world-network.png",
  },
  {
    id: "one-click-pr-previews",
    number: "03",
    title: "From 10-Minute QA Setup to 30 Seconds",
    subtitle: "Building One-Click PR Previews",
    description:
      "How we turned every pull request into a fully wired full-stack environment — backend on Railway, frontends on Vercel, mobile OTA via EAS, and auto-authenticated Postman collections.",
    tags: ["GitHub Actions", "Railway", "Vercel", "EAS", "CI/CD"],
    readTime: "35 min read",
    date: "2026",
    image: "/blog/pr-preview-backend.png",
  },
];

export const Blog = () => {
  const navigate = useNavigate();

  return (
    <section
      id="blog"
      className="min-h-screen flex items-center justify-center py-32 px-6"
    >
      <RevealOnScroll>
        <div className="max-w-5xl w-full">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-green-500 font-mono text-sm">04</span>
            <span className="text-th-text-faint">/</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Writing
            </h2>
          </div>

          {/* Featured Article — large visual card */}
          <article
            onClick={() => navigate(`/blog/${featuredBlog.id}`)}
            className="hoverable group border border-th-border hover:border-th-border-strong bg-th-card hover:bg-th-surface transition-all duration-300 cursor-pointer overflow-hidden mb-6"
          >
            <div className="relative aspect-[21/9] overflow-hidden">
              <img
                src={featuredBlog.image}
                alt={featuredBlog.title}
                className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-card)] via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="font-mono text-xs text-green-500 bg-black/60 px-3 py-1 backdrop-blur-sm">
                  {featuredBlog.number}
                </span>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4 text-th-text-muted font-mono text-xs">
                <span>{featuredBlog.readTime}</span>
                <span>·</span>
                <span>{featuredBlog.date}</span>
              </div>

              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-th-text mb-2 leading-tight group-hover:text-green-400 transition-colors">
                {featuredBlog.title}
              </h3>
              <p className="text-lg md:text-xl text-th-text-sub mb-2 italic">
                {featuredBlog.subtitle}
              </p>
              <p className="text-th-text-muted text-base leading-relaxed mb-6 max-w-2xl">
                {featuredBlog.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {featuredBlog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 border border-th-border-mid text-th-text-dim font-mono text-xs hover:border-green-500/30 hover:text-green-500/80 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-green-500 font-mono text-sm group-hover:gap-4 transition-all">
                <span>Read Article</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </article>

          {/* Compact article cards */}
          <div className="space-y-4">
            {articles.map((blog) => (
              <article
                key={blog.id}
                onClick={() => navigate(`/blog/${blog.id}`)}
                className="hoverable group border border-th-border hover:border-th-border-strong bg-th-card hover:bg-th-surface transition-all duration-300 cursor-pointer overflow-hidden flex flex-col md:flex-row"
              >
                <div className="relative w-full md:w-72 lg:w-80 flex-shrink-0 aspect-[16/9] md:aspect-auto overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--c-card)] hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-card)] via-transparent to-transparent md:hidden" />
                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-xs text-green-500 bg-black/60 px-2.5 py-0.5 backdrop-blur-sm">
                      {blog.number}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-3 mb-3 text-th-text-muted font-mono text-xs">
                    <span>{blog.readTime}</span>
                    <span>·</span>
                    <span>{blog.date}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-th-text mb-1 leading-tight group-hover:text-green-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-sm md:text-base text-th-text-sub mb-1 italic">
                    {blog.subtitle}
                  </p>
                  <p className="text-th-text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                    {blog.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {blog.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 border border-th-border-mid text-th-text-dim font-mono text-[0.65rem] hover:border-green-500/30 hover:text-green-500/80 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-green-500 font-mono text-xs group-hover:gap-3 transition-all">
                    <span>Read Article</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
