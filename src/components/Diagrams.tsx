
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Layers, Cpu, TrendingUp } from 'lucide-react';

// --- TECH STACK GRID ---
export const TechStackGrid: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);
  
  const tech = [
    { name: 'React', desc: 'Frontend UI', color: 'bg-blue-500' },
    { name: 'Next.js', desc: 'Full-stack App', color: 'bg-black' },
    { name: 'TypeScript', desc: 'Type Safety', color: 'bg-blue-600' },
    { name: 'Node.js', desc: 'Backend Logic', color: 'bg-green-600' },
    { name: 'PostgreSQL', desc: 'Database', color: 'bg-blue-800' },
    { name: 'Tailwind', desc: 'Styling', color: 'bg-cyan-500' },
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-800">Our Production Stack</h3>
      <p className="text-sm text-stone-500 mb-8 text-center max-w-md">
        We use industry-standard technologies to ensure long-term stability and performance.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
         {tech.map((item, idx) => (
             <motion.div
                key={item.name}
                onMouseEnter={() => setActive(idx)}
                onMouseLeave={() => setActive(null)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 flex flex-col items-center justify-center h-24 cursor-default ${active === idx ? 'border-nobel-gold bg-nobel-gold/5 scale-105' : 'border-stone-100 bg-stone-50'}`}
             >
                <div className={`w-3 h-3 rounded-full mb-2 ${item.color}`}></div>
                <span className="font-bold text-sm text-stone-800">{item.name}</span>
                <span className="text-[10px] uppercase text-stone-400 font-medium tracking-tight">{item.desc}</span>
             </motion.div>
         ))}
      </div>

      <div className="mt-8 flex items-center gap-2 text-xs font-mono text-stone-400">
          <Layers size={14} className="text-nobel-gold" />
          <span>ZERO-DOWNTIME ARCHITECTURE</span>
      </div>
    </div>
  );
};

// --- DEVELOPMENT CYCLE DIAGRAM ---
export const DevelopmentCycleDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: 'Discovery', icon: <Layers size={20} /> },
    { label: 'Design', icon: <Cpu size={20} /> },
    { label: 'Build', icon: <Activity size={20} /> },
    { label: 'Launch', icon: <TrendingUp size={20} /> }
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-900 text-center">Development Lifecycle</h3>

      <div className="relative w-full max-w-lg h-56 bg-white rounded-lg shadow-inner overflow-hidden mb-6 border border-stone-200 flex items-center justify-center gap-4 md:gap-8 p-4">
        {steps.map((s, idx) => (
            <React.Fragment key={s.label}>
                <div className="flex flex-col items-center gap-2">
                    <motion.div 
                        animate={{ 
                            scale: step === idx ? 1.1 : 1,
                            backgroundColor: step === idx ? '#C5A059' : '#F5F4F0',
                            color: step === idx ? '#fff' : '#A8A29E'
                        }}
                        className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-colors duration-500 ${step === idx ? 'border-nobel-gold' : 'border-stone-200'}`}
                    >
                        {s.icon}
                    </motion.div>
                    <span className={`text-[10px] uppercase font-bold tracking-wider ${step === idx ? 'text-stone-900' : 'text-stone-400'}`}>{s.label}</span>
                </div>
                {idx < 3 && (
                    <motion.div 
                        animate={{ opacity: step >= idx ? 1 : 0.2 }}
                        className="text-stone-300 font-bold"
                    >
                        →
                    </motion.div>
                )}
            </React.Fragment>
        ))}
      </div>

      <div className="flex gap-2">
          {[0, 1, 2, 3].map(s => (
              <div key={s} className={`h-1 rounded-full transition-all duration-300 ${step === s ? 'w-8 bg-nobel-gold' : 'w-2 bg-stone-300'}`}></div>
          ))}
      </div>
      <p className="mt-4 text-xs font-serif italic text-stone-500">Agile delivery within set timelines.</p>
    </div>
  );
};

// --- ROI GROWTH CHART ---
export const ROIChart: React.FC = () => {
    const [scenario, setScenario] = useState<0 | 1 | 2>(1);
    
    // Growth metrics (Projected vs Current)
    const data = [
        { label: 'Conversion', current: 2.1, projected: 4.8 },
        { label: 'Efficiency', current: 35, projected: 85 },
        { label: 'Retention', current: 12, projected: 45 }
    ];

    const currentItem = data[scenario];
    const maxVal = Math.max(currentItem.current, currentItem.projected) * 1.2;

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-stone-900 text-stone-100 rounded-xl my-8 border border-stone-800 shadow-lg">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-xl mb-2 text-nobel-gold">LunaLabs Impact</h3>
                <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                    Our technical strategy is focused on measurable business outcomes.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                    {data.map((d, i) => (
                        <button 
                            key={d.label}
                            onClick={() => setScenario(i as any)} 
                            className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 border ${scenario === i ? 'bg-nobel-gold text-stone-900 border-nobel-gold' : 'bg-transparent text-stone-400 border-stone-700 hover:border-stone-500 hover:text-stone-200'}`}
                        >
                            {d.label}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="relative w-64 h-72 bg-stone-800/50 rounded-xl border border-stone-700/50 p-6 flex justify-around items-end">
                {/* Legacy Bar */}
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                    <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <div className="absolute -top-5 w-full text-center text-xs font-mono text-stone-400 font-bold">{currentItem.current}%</div>
                        <motion.div 
                            className="w-full bg-stone-600 rounded-t-md border-t border-x border-stone-500/30"
                            initial={{ height: 0 }}
                            animate={{ height: `${(currentItem.current / maxVal) * 100}%` }}
                        />
                    </div>
                    <div className="h-6 flex items-center text-[10px] font-bold text-stone-500 uppercase tracking-widest">Off-Shelf</div>
                </div>

                {/* LunaLabs Bar */}
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                     <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <div className="absolute -top-5 w-full text-center text-xs font-mono text-nobel-gold font-bold">{currentItem.projected}%</div>
                        <motion.div 
                            className="w-full bg-nobel-gold rounded-t-md shadow-[0_0_20px_rgba(197,160,89,0.25)]"
                            initial={{ height: 0 }}
                            animate={{ height: `${(currentItem.projected / maxVal) * 100}%` }}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        />
                    </div>
                     <div className="h-6 flex items-center text-[10px] font-bold text-nobel-gold uppercase tracking-widest">LunaLabs</div>
                </div>
            </div>
        </div>
    )
}
