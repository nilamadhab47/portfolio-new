import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";

export const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  const featured = [
    {
      id: 1,
      title: "ZeroData Labs",
      tagline: "Privacy without trust 🔐",
      description: "Privacy-preserving data infrastructure with Zero-Knowledge Proofs, MPC, and decentralized storage.",
      tech: ["ZK Proofs", "MPC", "IPFS", "Smart Contracts"],
      link: "https://www.zerodatalabs.xyz/",
      emoji: "🔐",
    },
    {
      id: 2,
      title: "Echoes in the File",
      tagline: "Interactive noir narrative 🎬",
      description: "Cold case detective story with cinematic narration and immersive UI experience.",
      tech: ["React", "Web Audio", "Narrative Design"],
      link: "#",
      emoji: "🎬",
    },
    {
      id: 3,
      title: "FrameFlow",
      tagline: "AI annotation at scale 🖼️",
      description: "Enterprise annotation platform reducing labeling effort by 70% with human-in-the-loop workflows.",
      tech: ["Python", "Computer Vision", "React"],
      link: "https://www.frameflow.online/",
      emoji: "🖼️",
    },
  ];

  const other = [
    { title: "MyDoorView", desc: "200K+ users, zero-downtime migration", tag: "LensCorpAI" },
    { title: "JSW Trisha", desc: "600+ employees transport system", tag: "LensCorpAI" },
    { title: "Device Monitor", desc: "20K+ device real-time infra", tag: "LensCorpAI" },
    { title: "AiApply", desc: "AI resume optimization", link: "https://www.aiapply.live/" },
    { title: "CarbonLens", desc: "NASA satellite carbon reporting", link: "https://www.carbonlens.org/" },
    { title: "WatchTower", desc: "GitHub monitoring platform", link: "https://watchtower-ebon.vercel.app/" },
  ];

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-32 px-6"
    >
      <RevealOnScroll>
        <div className="max-w-5xl w-full">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-green-500 font-mono text-sm">02</span>
            <span className="text-[#333]">/</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Projects
            </h2>
          </div>

          {/* Featured Projects */}
          <div className="space-y-2 mb-24">
            {featured.map((project, idx) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group hoverable block py-8 border-t border-[#111] hover:bg-green-500/5 transition-colors"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-4xl group-hover:animate-bounce">{project.emoji}</span>
                      <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-green-400 transition-all">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-[#888] text-lg mb-3">{project.tagline}</p>
                    <p className="text-[#555] max-w-xl">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-3 mt-4">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="text-green-500/60 font-mono text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-[#333] group-hover:text-green-500 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all text-2xl">
                    ↗
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Other Projects */}
          <div>
            <p className="text-white font-bold uppercase mb-8 flex items-center gap-2">
              <span>📦</span> Other Projects
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {other.map((project, idx) => (
                <div
                  key={idx}
                  className="group hoverable"
                >
                  {project.link ? (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block border border-[#111] p-6 hover:border-green-500/50 hover:bg-green-500/5 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-white group-hover:text-green-400 transition-colors">
                          {project.title}
                        </h4>
                        <span className="text-[#333] group-hover:text-green-500 text-sm">↗</span>
                      </div>
                      <p className="text-[#555] text-sm">{project.desc}</p>
                    </a>
                  ) : (
                    <div className="border border-[#111] p-6 hover:border-[#222] transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-white">{project.title}</h4>
                        <span className="text-[#333] font-mono text-xs">{project.tag}</span>
                      </div>
                      <p className="text-[#555] text-sm">{project.desc}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
