import React from 'react';
import { Section } from './Section';
import { usePortfolio } from '../context/PortfolioContext';
import { Trophy, Users, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const Miscellany: React.FC = () => {
  const { data } = usePortfolio();

  const CategoryCard = ({ 
    title, 
    icon: Icon, 
    colorClass, 
    description, 
    children 
  }: { 
    title: string; 
    icon: any; 
    colorClass: string; 
    description: string;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-col h-full">
      <div className={`flex items-center gap-3 mb-3 ${colorClass}`}>
        <Icon size={24} />
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
      </div>
      <p className="text-zinc-600 dark:text-zinc-500 text-sm leading-relaxed mb-6 min-h-[40px]">
        {description}
      </p>
      <div className="space-y-4 flex-1">
        {children}
      </div>
    </div>
  );

  const ItemCard = ({ 
    title, 
    subtitle, 
    year, 
    desc, 
    icon: Icon, 
    iconColor 
  }: { 
    title: string; 
    subtitle: string; 
    year: string; 
    desc: string; 
    icon: any; 
    iconColor: string; 
  }) => (
    <motion.div 
      whileHover={{ y: -2 }}
      className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg dark:hover:shadow-zinc-800/50 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-3">
        <div className={`p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 ${iconColor}`}>
           <Icon size={16} />
        </div>
        <span className="text-[10px] font-mono font-medium px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700">
           {year}
        </span>
      </div>
      
      <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1 leading-snug">{title}</h4>
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">{subtitle}</p>
      
      {desc && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-3 border-t border-zinc-100 dark:border-zinc-800">
          {desc}
        </p>
      )}
    </motion.div>
  );

  return (
    <Section title="Achievements & Involvement" className="bg-zinc-50/50 dark:bg-zinc-900/20">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        
        {/* Awards Column */}
        <CategoryCard 
          title="Awards" 
          icon={Trophy} 
          colorClass="text-yellow-500"
          description="Honors and recognitions I've received during my academic and professional journey."
        >
          {data.awards.map((award, index) => (
            <ItemCard 
              key={index}
              title={award.title}
              subtitle={award.issuer}
              year={award.year}
              desc={award.description || ''}
              icon={Star}
              iconColor="text-yellow-500"
            />
          ))}
        </CategoryCard>

        {/* Activities Column */}
        <CategoryCard 
          title="Activities" 
          icon={Users} 
          colorClass="text-blue-500"
          description="Leadership roles and community involvement that helped shape my soft skills."
        >
          {data.extracurricular.map((activity, index) => (
            <ItemCard 
              key={index}
              title={activity.role}
              subtitle={activity.organization}
              year={activity.period}
              desc={activity.description}
              icon={Users}
              iconColor="text-blue-500"
            />
          ))}
        </CategoryCard>

        {/* Volunteering Column */}
        {data.socialWork.length > 0 && (
          <CategoryCard 
            title="Volunteering" 
            icon={Heart} 
            colorClass="text-pink-500"
            description="Giving back to the community through mentorship and social services."
          >
            {data.socialWork.map((work, index) => (
              <ItemCard 
                key={index}
                title={work.role}
                subtitle={work.organization}
                year={work.period}
                desc={work.description}
                icon={Heart}
                iconColor="text-pink-500"
              />
            ))}
          </CategoryCard>
        )}

      </div>
    </Section>
  );
};