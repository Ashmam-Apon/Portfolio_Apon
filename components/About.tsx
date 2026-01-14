import React from 'react';
import { Section } from './Section';
import { usePortfolio } from '../context/PortfolioContext';
import { Github, Linkedin, Twitter, Dribbble, Globe, Mail, MapPin, GraduationCap, MessageCircle, Phone } from 'lucide-react';

export const About: React.FC = () => {
  const { data } = usePortfolio();

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github': return <Github size={20} />;
      case 'linkedin': return <Linkedin size={20} />;
      case 'twitter': return <Twitter size={20} />;
      case 'dribbble': return <Dribbble size={20} />;
      case 'gmail': return <Mail size={20} />;
      case 'whatsapp': return <MessageCircle size={20} />;
      default: return <Globe size={20} />;
    }
  };

  return (
    <Section id="about" title="About Me" className="bg-white dark:bg-zinc-900/50">
      <div className="grid md:grid-cols-12 gap-12">
        {/* Left Column: Bio & Info */}
        <div className="md:col-span-7 space-y-8">
          
          {/* Bio */}
          <div className="prose dark:prose-invert max-w-none">
             <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-lg whitespace-pre-wrap">
               {data.profile.bio || data.profile.description}
             </p>
          </div>
          
          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                   <MapPin size={16} />
                   <span className="text-xs uppercase tracking-wide font-semibold">Location</span>
                </div>
                <div className="font-medium">{data.profile.location}</div>
             </div>
             <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                   <Mail size={16} />
                   <span className="text-xs uppercase tracking-wide font-semibold">Email</span>
                </div>
                <div className="font-medium truncate" title={data.profile.email}>{data.profile.email}</div>
             </div>
             <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                   <Phone size={16} />
                   <span className="text-xs uppercase tracking-wide font-semibold">Phone</span>
                </div>
                <div className="font-medium truncate">{data.profile.phone}</div>
             </div>
          </div>

          {/* Education Subsection */}
          <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                    <GraduationCap size={20} />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Education</h3>
             </div>
             <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-800">
                     <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-900 border-2 border-blue-500"></div>
                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                        <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{edu.degree}</h4>
                        <span className="text-xs font-mono text-zinc-500">{edu.year}</span>
                     </div>
                     <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{edu.institution}</div>
                     {edu.description && (
                       <p className="text-sm text-zinc-500 mt-1">{edu.description}</p>
                     )}
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Socials & Connect */}
        <div className="md:col-span-5 flex flex-col justify-start gap-6">
           {/* Socials Box */}
           <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6">Connect with me</h3>
              <div className="space-y-4">
                 {data.socials.map((social, index) => (
                   <a 
                     key={index} 
                     href={social.url} 
                     target="_blank" 
                     rel="noreferrer"
                     className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1 group"
                   >
                     <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {getIcon(social.icon)}
                     </div>
                     <div className="font-medium">{social.platform}</div>
                     <div className="ml-auto text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                        →
                     </div>
                   </a>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </Section>
  );
};