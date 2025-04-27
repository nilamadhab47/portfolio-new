import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  const frontendSkills = [
    "NextJS",
    "React", 
    "Svelte Kit",
    "TypeScript",
    "TailwindCSS",
    "React Native"
  ];

  const backendSkills = [
    "NestJS", 
    "Node.js", 
    "Golang", 
    "Python", 
    "Java", 
    "AWS", 
    "MongoDB", 
    "PostgreSQL", 
    "Redis", 
    "Docker", 
    "Kubernetes",
    "Microservices",
    "REST APIs",
    "Web3",
    "TensorFlow",
    "NLP"
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
              Backend-focused Full Stack Developer with almost 3 years of experience building scalable, AI-powered systems. Proven track record in leading teams, automating complex workflows, and delivering high-impact solutions in AI and enterprise SaaS domains.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {frontendSkills.map((tech, key) => (
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
                <h3 className="text-xl font-bold mb-4">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {backendSkills.map((tech, key) => (
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
                  <h4 className="font-semibold">
                    Backend Developer at LensCorpAI (Sept 2023 - Present)
                  </h4>
                  <p>
                    Led a 6-member R&D team delivering high-impact client projects using Agile; built AI-powered systems including sales chatbots and facial recognition authentication.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">
                    Full Stack Developer at SuperMinds IT (Aug 2022 - Aug 2023)
                  </h4>
                  <p>
                    Built a Web3 chess game with Chess.js and Metamask integration. Mentored junior devs and improved frontend performance by 30%.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold">
                    Freelancer / Side Projects (2023 - 2024)
                  </h4>
                  <p>
                    Built MVPs and smart contract integrations for startups in blockchain and real estate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
