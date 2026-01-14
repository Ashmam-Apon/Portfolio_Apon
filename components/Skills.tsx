import React from 'react';
import { Section } from './Section';
import { usePortfolio } from '../context/PortfolioContext';
import { Code2, Server, Terminal, Database, Cpu, Gamepad2, Layers } from 'lucide-react';

export const Skills: React.FC = () => {
  const { data } = usePortfolio();

  const getIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('language')) return <Terminal size={24} />;
    if (cat.includes('framework') || cat.includes('library')) return <Layers size={24} />;
    if (cat.includes('database') || cat.includes('backend')) return <Database size={24} />;
    if (cat.includes('tool') || cat.includes('devops')) return <Server size={24} />;
    if (cat.includes('hardware') || cat.includes('iot')) return <Cpu size={24} />;
    if (cat.includes('design') || cat.includes('game')) return <Gamepad2 size={24} />;
    return <Code2 size={24} />;
  };

  return (
    <Section title="Technical Expertise" className="bg-zinc-100/50 dark:bg-zinc-900/30">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.skills.map((skillGroup, index) => (
          <div key={index} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                {getIcon(skillGroup.category)}
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {skillGroup.category}
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((item, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:border-purple-500/50 transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};