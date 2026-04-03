import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SkillGap } from '../types';

interface SkillsGapProps {
  data: SkillGap[];
}

export default function SkillsGap({ data }: SkillsGapProps) {
  const chartData = data.map(item => ({
    name: item.skill,
    "Current": item.currentLevel,
    "Target": item.targetLevel,
    priority: item.priority
  }));

  return (
    <div className="space-y-10">
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="Current" fill="#475569" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Target" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data.map((skill, idx) => (
          <div key={idx} className="p-5 rounded-2xl border border-brand-border bg-brand-bg flex items-center justify-between group hover:border-brand-primary/50 transition-colors">
            <div>
              <div className="font-bold text-slate-100 mb-1">{skill.skill}</div>
              <div className="text-xs text-slate-500 font-medium">Gap: {skill.targetLevel - skill.currentLevel}% proficiency</div>
            </div>
            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
              skill.priority === 'High' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
              skill.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
              'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
            }`}>
              {skill.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
