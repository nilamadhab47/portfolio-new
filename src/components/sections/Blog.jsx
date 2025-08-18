import { RevealOnScroll } from "../RevealOnScroll";

export const Blog = () => {
  // Placeholder blog posts - you can replace these with real blog data
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable AI Systems: Lessons from Production",
      excerpt: "Key insights from architecting AI systems that handle 20K+ devices in production environments.",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: ["AI", "Architecture", "Scalability"],
      status: "coming-soon"
    },
    {
      id: 2,
      title: "From Monolith to Microservices: A Real-World Journey",
      excerpt: "How we transformed our legacy system into a distributed architecture using NestJS and Docker.",
      date: "2024-01-10",
      readTime: "12 min read",
      tags: ["Microservices", "NestJS", "DevOps"],
      status: "coming-soon"
    },
    {
      id: 3,
      title: "The Future of Authentication: Beyond Passwords",
      excerpt: "Exploring biometric authentication systems and decentralized identity solutions.",
      date: "2024-01-05",
      readTime: "6 min read",
      tags: ["Authentication", "Biometrics", "Web3"],
      status: "coming-soon"
    },
    {
      id: 4,
      title: "Leading Engineering Teams: Hiring and Mentoring at Scale",
      excerpt: "Insights from conducting 80+ interviews and onboarding 20+ engineers.",
      date: "2023-12-28",
      readTime: "10 min read",
      tags: ["Leadership", "Hiring", "Mentoring"],
      status: "coming-soon"
    }
  ];

  return (
    <section
      id="blog"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Blog & Insights
          </h2>
          
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Sharing my experiences in AI systems, backend architecture, team leadership, and the latest trends in software engineering.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <time className="text-sm text-gray-400">{post.date}</time>
                  <span className="text-sm text-gray-400">{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {post.status === "coming-soon" ? (
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 text-sm font-medium flex items-center gap-2">
                      <span>⏳</span> Coming Soon
                    </span>
                    <span className="text-gray-500 text-sm">Stay tuned!</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-2">
                      Read More <span>→</span>
                    </button>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <span>👁</span> {post.views || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>💬</span> {post.comments || 0}
                      </span>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="p-6 rounded-xl border border-white/10 bg-gradient-to-r from-blue-500/5 to-cyan-400/5">
              <h3 className="text-xl font-bold mb-3 text-white">
                📝 More Content Coming Soon!
              </h3>
              <p className="text-gray-300 mb-4">
                I'm actively working on sharing more insights about AI systems, backend architecture, and engineering leadership. 
                Subscribe to get notified when new posts are published.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition"
                />
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(59,130,246,0.4)] transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
