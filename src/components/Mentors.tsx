import { Mentor } from "../types";
import { MessageSquare, Linkedin, Star, Briefcase } from "lucide-react";
import { motion } from "motion/react";

interface MentorsProps {
  mentors: Mentor[];
}

export default function Mentors({ mentors }: MentorsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {mentors.map((mentor, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-brand-surface rounded-3xl border border-brand-border overflow-hidden hover:shadow-2xl hover:shadow-brand-primary/10 transition-all group"
        >
          <div className="h-28 bg-gradient-to-br from-brand-primary to-brand-secondary relative">
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 rounded-3xl bg-brand-surface p-1.5 shadow-2xl">
                <img 
                  src={mentor.avatar || `https://picsum.photos/seed/${mentor.name}/200`} 
                  alt={mentor.name}
                  className="w-full h-full object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
          
          <div className="pt-16 p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-100 mb-1">{mentor.name}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                <Briefcase className="w-4 h-4 text-brand-primary" />
                {mentor.role} at {mentor.company}
              </div>
            </div>
            
            <p className="text-sm text-slate-400 mb-6 leading-relaxed line-clamp-3">
              {mentor.bio}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Expertise</div>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((exp, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 text-[10px] font-bold rounded-lg border border-slate-700">
                    {exp}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-brand-primary text-white text-sm font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Connect
              </button>
              <button className="p-3 border border-brand-border rounded-xl hover:bg-slate-800 transition-colors text-slate-400">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
