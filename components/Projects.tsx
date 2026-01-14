import React from 'react';
import { Section } from './Section';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUpRight } from 'lucide-react';

export const Projects: React.FC = () => {
  const { data } = usePortfolio();
  
  return (
    <Section id="projects" title="Featured Projects">
      <div className="grid gap-12">
        {data.projects.map((project, index) => (
          <div 
            key={index} 
            className="group grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            {/* Image Side */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-purple-500/10 order-2 md:order-1">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/5 transition-all duration-300" />
            </div>

            {/* Content Side */}
            <div className="order-1 md:order-2 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                        <span 
                            key={tagIndex} 
                            className="text-xs font-semibold px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                        >
                            {tag}
                        </span>
                        ))}
                    </div>
                </div>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-white dark:bg-zinc-800 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-white hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-zinc-900 transition-all shadow-sm"
                >
                  <ArrowUpRight size={20} />
                </a>
              </div>
              
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-2">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
