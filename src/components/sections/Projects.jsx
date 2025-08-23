import { RevealOnScroll } from "../RevealOnScroll";

export const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>
          
          {/* Professional Projects Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-white">
              🏢 Professional Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">AltasCloud.io</h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">LensCorpAI</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Enterprise-grade AI and SaaS platform that increased client revenue by 30% and automated over 90% of manual workflows.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["NestJS", "React", "AWS", "MongoDB"].map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            
              <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">ZKTecoHub.com</h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">LensCorpAI</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Enterprise-grade SaaS platform developed as part of R&D team, delivering high-impact solutions for improved operational efficiency.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["NestJS", "Golang", "Docker", "PostgreSQL"].map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            
              <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">JSW Fleet Intelligence System</h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">LensCorpAI</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Scalable fleet intelligence system with GPS tracking, driver analytics, and route insights — reduced oil theft by 60% and manual oversight by 80%.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["NestJS", "React Native", "GPS Tracking", "Analytics"].map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">Real-time Network Monitoring</h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">LensCorpAI</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Real-time network monitoring infrastructure for 20K+ distributed devices using ICMP, Golang, and Redis Streams — cut vendor costs by 40%.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Golang", "ICMP", "Redis Streams", "Docker"].map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">IQUA Emotional Therapy Bot</h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">LensCorpAI</span>
                </div>
                <p className="text-gray-400 mb-4">
                  In-house deep-learning product using custom LLMs, NLP pipelines, and ElevenLabs APIs — improved user engagement and reduced manual QA by 50%.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Custom LLMs", "NLP", "ElevenLabs", "Python"].map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">VISUS AI Inspection System</h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">LensCorpAI</span>
                </div>
                <p className="text-gray-400 mb-4">
                  In-house deep-learning product for AI inspection system using custom LLMs and NLP pipelines — improved user engagement and reduced manual QA by 50%.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Custom LLMs", "NLP", "AI Inspection", "Python"].map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">Passwordless Authentication System</h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">LensCorpAI</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Passwordless authentication system using facial & palm recognition, with plans to integrate decentralized identity (DID + IPFS) — reduced auth latency by 30%.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Facial Recognition", "Palm Recognition", "DID", "IPFS"].map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">Web3 Chess Game</h3>
                  <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">SuperMinds IT</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Multiplayer Web3 chess game using Chess.js and MetaMask for decentralized gameplay on Ethereum blockchain.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["React", "Web3", "Chess.js", "MetaMask", "Ethereum"].map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Personal Projects Section */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center text-white">
              💡 Personal Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href="https://www.aiapply.live/" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-pointer">
                <h3 className="text-xl font-bold mb-2">AiApply</h3>
                <p className="text-gray-400 mb-4">
                  AI-powered resume optimization platform. Upload your resume and job description to receive ATS scores, tailored improvement suggestions, and a curated cover letter. Features include JD-to-resume compatibility analysis, copy-ready resume edits, and top 5 job matches in your region.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["FastAPI", "OpenAI APIs", "Next.js", "ATS Optimization"].map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </a>

              <a href="https://www.carbonlens.org/" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-pointer">
                <h3 className="text-xl font-bold mb-2">CarbonLens</h3>
                <p className="text-gray-400 mb-4">
                  Automated carbon reporting tool designed for Indian regulatory compliance. Leverages NASA-grade satellite data to calculate Scope 1, 2, and 3 emissions for ESG and audit readiness.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Python", "Satellite APIs", "NASA Data", "ESG Compliance"].map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
              
              <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-pointer">
                <h3 className="text-xl font-bold mb-2">Reallo</h3>
                <p className="text-gray-400 mb-4">
                  Smart personal budgeting app that helps users reallocate budgets and avoid over-spending. Built with React Native and Node.js.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["React Native", "Node.js", "MongoDB", "Express"].map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <a href="https://synq-nine.vercel.app/" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-pointer">
                <h3 className="text-xl font-bold mb-2">Synq</h3>
                <p className="text-gray-400 mb-4">
                  A unified JIRA + Slack platform enabling task management and chat in one interface. Built on Next.js, WebSockets, and PostgreSQL.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Next.js", "WebSockets", "PostgreSQL", "React"].map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
              
              <a href="https://watchtower-ebon.vercel.app/" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-pointer">
                <h3 className="text-xl font-bold mb-2">WatchTower</h3>
                <p className="text-gray-400 mb-4">
                  Plug-and-play GitHub monitoring platform with Prometheus / Grafana-style metrics, AI assistant and modern user interface.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["FastAPI", "React", "Prometheus", "AI Assistant"].map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
              
              <a href="https://www.frameflow.online/" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-pointer">
                <h3 className="text-xl font-bold mb-2">FrameFlow</h3>
                <p className="text-gray-400 mb-4">
                  Enterprise-grade annotation platform that cuts labeling time by 70% using AI-human workflows. Scales across large video/image datasets.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Python", "AI Workflows", "Computer Vision", "React"].map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
