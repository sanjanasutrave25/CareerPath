import { Project } from "../types";
import { Code2, ExternalLink, Layers } from "lucide-react";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, idx) => (
        <div key={idx} className="group relative p-8 rounded-3xl border border-brand-border bg-brand-surface hover:border-brand-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-primary/10">
          <div className="flex items-start justify-between mb-6">
            <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-2xl group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
              <Code2 className="w-7 h-7" />
            </div>
            <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border ${
              project.difficulty === 'Advanced' ? 'bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20' :
              project.difficulty === 'Intermediate' ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' :
              'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
            }`}>
              {project.difficulty}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-brand-primary transition-colors">{project.name}</h3>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech, i) => (
              <span key={i} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
                <Layers className="w-3 h-3 text-brand-secondary" />
                {tech}
              </span>
            ))}
          </div>
          
          <button className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-brand-primary border border-brand-primary/20 rounded-xl hover:bg-brand-primary hover:text-white transition-all duration-300">
            View Project Details
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
