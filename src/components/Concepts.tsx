import { Lightbulb, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface ConceptsProps {
  concepts: string[];
}

export default function Concepts({ concepts }: ConceptsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {concepts.map((concept, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.05 }}
          className="p-8 rounded-3xl bg-brand-surface border border-brand-border shadow-lg hover:border-brand-secondary/50 transition-all flex gap-6 items-start group"
        >
          <div className="p-3 bg-brand-secondary/10 text-brand-secondary rounded-2xl group-hover:bg-brand-secondary group-hover:text-brand-bg transition-all duration-300 shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 mb-2 flex items-center gap-2 text-lg">
              Concept {idx + 1}
              <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              {concept}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
