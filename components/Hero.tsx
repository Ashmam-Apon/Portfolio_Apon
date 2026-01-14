import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Github, Linkedin, Twitter, Dribbble, ArrowDown, FileText, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-12 relative overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      
      {/* Professional Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-transparent dark:from-zinc-950"></div>
      </div>
      
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-900/20 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-900/20 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />
      
      {/* Glassy Content Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl rounded-3xl border border-white/50 dark:border-zinc-700/50 p-6 md:p-12 shadow-2xl shadow-zinc-200/20 dark:shadow-black/40"
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            
            {/* Text Content */}
            <div className="flex flex-col gap-6 order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 w-fit shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Open to work</span>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl md:text-2xl font-medium text-zinc-600 dark:text-zinc-400">
                  Hi, I'm <span className="font-semibold text-zinc-900 dark:text-zinc-100">{data.profile.name}</span>
                </h2>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                    {data.profile.role.split(' & ')[0]}
                  </span>
                  <br />
                  <span className="text-zinc-900 dark:text-zinc-100">{data.profile.role.split(' & ')[1]}</span>
                </h1>
              </div>
              
              <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-lg">
                {data.profile.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <a 
                  href="#contact"
                  onClick={scrollToContact}
                  className="px-8 py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-zinc-900/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail size={18} />
                  Contact Me
                </a>
                <a 
                  href={data.profile.resumeUrl}
                  download={`${data.profile.name.replace(/\s+/g, '_')}_Resume.pdf`}
                  className="px-8 py-3.5 bg-white/50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white font-bold rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800 transition-all transform hover:-translate-y-0.5 backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText size={18} />
                  Download CV
                </a>
              </div>

              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-zinc-200/50 dark:border-zinc-700/50">
                {data.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors transform hover:scale-110"
                    aria-label={social.platform}
                  >
                    {social.icon === 'github' && <Github size={22} />}
                    {social.icon === 'linkedin' && <Linkedin size={22} />}
                    {social.icon === 'twitter' && <Twitter size={22} />}
                    {social.icon === 'dribbble' && <Dribbble size={22} />}
                    {social.icon === 'gmail' && <Mail size={22} />}
                    {social.icon === 'whatsapp' && <MessageCircle size={22} />}
                  </a>
                ))}
              </div>
            </div>

            {/* Image Content */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-[400px] md:h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-[2rem] -rotate-6 opacity-20 blur-lg animate-pulse" />
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-4 border-white/50 dark:border-zinc-800/50 shadow-2xl">
                  <img 
                    src={data.profile.avatar} 
                    alt={data.profile.name} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-[2rem]" />
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-zinc-400"
      >
        <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.div>
    </section>
  );
};