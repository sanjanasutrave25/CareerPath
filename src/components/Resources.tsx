import { Resource } from "../types";
import { BookOpen, Video, FileText, Wrench, ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface ResourcesProps {
  resources: Resource[];
}

const ResourceIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'Course': return <Video className="w-5 h-5" />;
    case 'Book': return <BookOpen className="w-5 h-5" />;
    case 'Article': return <FileText className="w-5 h-5" />;
    case 'Tool': return <Wrench className="w-5 h-5" />;
    default: return <ExternalLink className="w-5 h-5" />;
  }
};

export default function Resources({ resources }: ResourcesProps) {
  return (
    <div className="space-y-5">
      {resources.map((resource, idx) => (
        <motion.a
          key={idx}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="flex items-center gap-6 p-6 bg-brand-surface border border-brand-border rounded-2xl hover:border-brand-primary/50 hover:shadow-xl hover:shadow-brand-primary/5 transition-all group"
        >
          <div className="p-4 bg-slate-800 text-slate-400 rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
            <ResourceIcon type={resource.type} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1.5">
              <h4 className="font-bold text-slate-100 truncate text-lg group-hover:text-brand-primary transition-colors">{resource.title}</h4>
              <span className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-[10px] font-black rounded-full uppercase tracking-widest border border-brand-primary/20">
                {resource.type}
              </span>
            </div>
            <div className="text-xs text-slate-500 mb-2 font-medium italic">Provided by {resource.provider}</div>
            <p className="text-sm text-slate-400 truncate leading-relaxed">{resource.description}</p>
          </div>
          
          <div className="p-3 text-slate-700 group-hover:text-brand-primary transition-all duration-300 group-hover:translate-x-1">
            <ArrowRight className="w-6 h-6" />
          </div>
        </motion.a>
      ))}
    </div>
  );
}
