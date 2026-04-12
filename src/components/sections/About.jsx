import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  const skills = {
    languages: ["Golang", "Node.js", "Python", "Java"],
    cloud: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    databases: ["PostgreSQL", "MongoDB", "Redis"],
    other: ["GraphQL", "Microservices", "System Design"],
  };

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-32 px-6"
    >
      <RevealOnScroll>
        <div className="max-w-5xl">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-green-500 font-mono text-sm">01</span>
            <span className="text-th-text-faint">/</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              About
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left - Bio */}
            <div>
              <p className="text-2xl md:text-3xl font-light text-th-text leading-relaxed mb-8">
                I build things that{" "}
                <span className="text-stroke hoverable cursor-default">scale</span>{" "}
                <span className="text-green-500">(and don't crash at 3 AM)</span>.
              </p>

              <div className="space-y-6 text-th-text-sub text-lg leading-relaxed">
                <p>
                  Backend & Cloud Engineer with <span className="text-th-text font-bold text-xl">3.5+ years</span> of 
                  experience turning complex problems into elegant solutions.
                </p>
                <p>
                  I've architected systems handling <span className="text-green-400 font-bold">200K+ users</span>, 
                  managed <span className="text-green-400 font-bold">20K+ device fleets</span>, and led 
                  <span className="text-green-400 font-bold"> 60+ technical interviews</span>.
                </p>
                <p className="text-th-text-muted italic">
                  "When I'm not pushing commits, I'm probably at a bar discussing 
                  why microservices are both the best and worst thing ever" 🍺
                </p>
              </div>

              {/* AWS Badges - BIGGER & BOLDER */}
              <div className="mt-12">
                <p className="text-th-text font-bold text-lg uppercase mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏆</span> Certifications
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="hoverable border-2 border-[#ff9900] bg-[#ff9900]/10 px-6 py-3 font-bold text-[#ff9900] hover:bg-[#ff9900] hover:text-black transition-all cursor-default group">
                    <span className="group-hover:animate-glitch">☁️ AWS Solutions Architect</span>
                  </div>
                  <div className="hoverable border-2 border-[#ff9900] bg-[#ff9900]/10 px-6 py-3 font-bold text-[#ff9900] hover:bg-[#ff9900] hover:text-black transition-all cursor-default group">
                    <span className="group-hover:animate-glitch">👨‍💻 AWS Developer Associate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Skills & Experience */}
            <div>
              {/* Skills grid */}
              <div className="mb-12">
                <p className="text-th-text font-bold text-lg uppercase mb-6 flex items-center gap-2">
                  <span className="text-2xl">⚡</span> Tech Stack
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(skills).map(([category, items]) => (
                    <div key={category}>
                      <p className="text-green-500 text-xs font-mono uppercase mb-3 font-bold">{category}</p>
                      <div className="space-y-2">
                        {items.map((skill, idx) => (
                          <div 
                            key={idx}
                            className="hoverable text-th-text hover:text-green-400 hover:translate-x-2 transition-all cursor-default font-medium"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience - BIGGER */}
              <div>
                <p className="text-th-text font-bold text-lg uppercase mb-6 flex items-center gap-2">
                  <span className="text-2xl">💼</span> Experience
                </p>
                <div className="space-y-8">
                  <div className="group hoverable cursor-default border-l-4 border-green-500 pl-6 py-2 hover:bg-green-500/5 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-th-text group-hover:animate-glitch">
                        Head of Engineering
                      </h3>
                      <span className="text-green-500 font-mono text-sm font-bold bg-green-500/10 px-3 py-1">2023-25</span>
                    </div>
                    <p className="text-green-400 font-medium mb-2">LensCorpAI</p>
                    <p className="text-th-text-dim text-sm">
                      Led system design, backend architecture, and AWS infrastructure. 
                      Built platforms serving 200K+ users.
                    </p>
                  </div>

                  <div className="group hoverable cursor-default border-l-4 border-blue-500 pl-6 py-2 hover:bg-blue-500/5 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-th-text group-hover:animate-glitch">
                        Full Stack Developer
                      </h3>
                      <span className="text-blue-500 font-mono text-sm font-bold bg-blue-500/10 px-3 py-1">2022-23</span>
                    </div>
                    <p className="text-blue-400 font-medium mb-2">SuperMinds IT</p>
                    <p className="text-th-text-dim text-sm">
                      Built Web3 chess platform with Ethereum & MetaMask integration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education - BIGGER */}
              <div className="mt-12 p-6 border-2 border-th-border-strong hover:border-th-text transition-colors">
                <p className="text-th-text font-bold text-lg uppercase mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎓</span> Education
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-th-text font-bold text-xl">B.Sc, University of Delhi</p>
                    <p className="text-th-text-muted">Computer Science</p>
                  </div>
                  <span className="text-th-text font-mono font-bold bg-th-surface px-4 py-2">2018-21</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
