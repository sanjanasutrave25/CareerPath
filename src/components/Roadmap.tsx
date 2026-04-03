import { motion } from "motion/react";
import { RoadmapStep } from "../types";
import { CheckCircle2, Circle, MapPin } from "lucide-react";

interface RoadmapProps {
  steps: RoadmapStep[];
}

export default function Roadmap({ steps }: RoadmapProps) {
  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
        >
          {/* Icon */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-brand-border bg-brand-surface text-slate-500 shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            {index === 0 ? <MapPin className="w-5 h-5 text-brand-primary" /> : <Circle className="w-4 h-4" />}
          </div>
          
          {/* Content */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-brand-border bg-brand-surface shadow-xl">
            <div className="flex items-center justify-between space-x-2 mb-2">
              <div className="font-bold text-slate-100">{step.title}</div>
              <time className="font-mono text-xs font-bold text-brand-primary">{step.duration}</time>
            </div>
            <div className="text-slate-400 text-sm mb-4 leading-relaxed">{step.description}</div>
            
            {/* Topics Section */}
            <div className="mb-4">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Key Topics</div>
              <div className="flex flex-wrap gap-1.5">
                {step.topics.map((topic, i) => (
                  <span key={i} className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-[10px] font-bold rounded border border-brand-primary/20">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {step.resources.map((res, i) => (
                <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] font-medium rounded-full border border-slate-700">
                  {res}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
