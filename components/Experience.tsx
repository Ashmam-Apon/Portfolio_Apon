import React from 'react';
import { Section } from './Section';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, GraduationCap, Building2 } from 'lucide-react';

export const WorkExperience: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <Section id="experience" title="Work Experience">
      <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-6 group">
              
              {/* Icon Column */}
              <div className="flex-shrink-0 mt-1">
                 <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl text-purple-600 dark:text-purple-400 border border-zinc-200 dark:border-zinc-700 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Briefcase size={20} />
                 </div>
                 {/* Connector Line */}
                 {index !== data.experience.length - 1 && (
                    <div className="w-px h-full bg-zinc-200 dark:bg-zinc-800 mx-auto mt-2" />
                 )}
              </div>

              {/* Content Card */}
              <div className="flex-1 p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/30 dark:hover:border-purple-500/30 transition-all hover:shadow-lg dark:hover:shadow-purple-500/5">
                 <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{exp.role}</h3>
                        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium mt-1">
                          <Building2 size={14} />
                          <span>{exp.company}</span>
                        </div>
                    </div>
                    <span className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-3 py-1.5 rounded-full w-fit mt-3 md:mt-0">
                        {exp.year}
                    </span>
                 </div>
                 <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    {exp.description}
                 </p>
              </div>
            </div>
          ))}
        </div>
    </Section>
  );
};

export const Education: React.FC = () => {
  const { data } = usePortfolio();

  return (
      <Section title="Education">
        <div className="grid md:grid-cols-2 gap-6">
          {data.education.map((edu, index) => (
            <div 
              key={index} 
              className="relative p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/30 transition-all hover:shadow-lg dark:hover:shadow-blue-500/5 overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <GraduationCap size={120} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                    <GraduationCap size={24} />
                  </div>
                  <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                    {edu.year}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">{edu.degree}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-4">{edu.institution}</p>
                
                {edu.description && (
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    {edu.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>
  );
};