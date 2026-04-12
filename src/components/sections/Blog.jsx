import { useNavigate } from "react-router-dom";
import { RevealOnScroll } from "../RevealOnScroll";

const blogs = [
  {
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

          {/* Blog Cards */}
          <div className="space-y-8">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                onClick={() => navigate(`/blog/${blog.id}`)}
                className="hoverable group border border-th-border hover:border-th-border-strong bg-th-card hover:bg-th-surface transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[21/9] overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-card)] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-xs text-green-500 bg-black/60 px-3 py-1 backdrop-blur-sm">
                      {blog.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-4 text-th-text-muted font-mono text-xs">
                    <span>{blog.readTime}</span>
                    <span>·</span>
                    <span>{blog.date}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-th-text mb-2 leading-tight group-hover:text-green-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-lg md:text-xl text-th-text-sub mb-2 italic">
                    {blog.subtitle}
                  </p>
                  <p className="text-th-text-muted text-base leading-relaxed mb-6 max-w-2xl">
                    {blog.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {blog.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 border border-th-border-mid text-th-text-dim font-mono text-xs hover:border-green-500/30 hover:text-green-500/80 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read link */}
                  <div className="flex items-center gap-2 text-green-500 font-mono text-sm group-hover:gap-4 transition-all">
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
