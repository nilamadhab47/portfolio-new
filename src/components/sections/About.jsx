import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  const languages = [
    "Golang",
    "Node.js (NestJS)",
    "Python",
    "Java",
    "JavaScript",
    "TypeScript"
  ];

  const frameworks = [
    "NestJS",
    "React",
    "Next.js",
    "SvelteKit",
    "TensorFlow",
    "Kafka",
    "React Native"
  ];

  const cloudAndTools = [
    "AWS (EC2, ECS, S3)",
    "Docker",
    "Kubernetes",
    "GitHub Actions",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Microservices",
    "REST APIs",
    "Agile/Scrum",
    "TDD"
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            About Me
          </h2>

          <div className="rounded-xl p-8 border-white/10 border hover:-translate-y-1 transition-all">
            <p className="text-gray-300 mb-6">
              Lead Engineer with 3+ years of experience architecting scalable AI systems, real-time infrastructure, and SaaS platforms. Proven track record of designing distributed backends handling 20K+ devices, leading high-performing teams, and shipping production-grade developer tools. Currently focused on AI automation, observability infrastructure, and annotation platforms built for scale.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition
                    "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {frameworks.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition
                    "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Cloud & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {cloudAndTools.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition
                    "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4">🏫 Education</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  <strong>Bachelor of Science</strong> - University of Delhi
                  (2018-2021), 8.8 CGPA
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4">💼 Work Experience</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-semibold text-blue-400">
                    Lead Engineer (Backend & AI Systems) - LensCorpAI
                  </h4>
                  <p className="text-sm text-gray-400 mb-2">Sept 2023 – Present | Gurugram, India</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Spearheaded enterprise-grade AI and SaaS platforms, increasing client revenue by 30%</li>
                    <li>Architected fleet intelligence system for JSW, reducing oil theft by 60%</li>
                    <li>Built real-time monitoring for 20K+ devices, cutting vendor costs by 40%</li>
                    <li>Led hiring operations: 80+ interviews, onboarded 20+ engineers</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-400">
                    Full Stack Developer - SuperMinds IT
                  </h4>
                  <p className="text-sm text-gray-400 mb-2">Aug 2022 – Aug 2023 | Onsite</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Developed multiplayer Web3 chess game with MetaMask integration</li>
                    <li>Refactored React frontend, reducing bundle size by 25%</li>
                    <li>Improved Lighthouse SEO score from 71 to 93</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
