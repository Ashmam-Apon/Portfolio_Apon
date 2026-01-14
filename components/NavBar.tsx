import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Twitter, Dribbble, Mail, MessageCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export const NavBar: React.FC = () => {
  const { data } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy Logic
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      // Offset accounting for navbar height (80px) + some breathing room
      const scrollPosition = window.scrollY + 100; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      setIsOpen(false); // Close mobile menu if open
      
      const navHeight = 80; // Matches h-20 class
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navLinks = [
    { name: "About", href: "#about", id: 'about' },
    { name: "Experience", href: "#experience", id: 'experience' },
    { name: "Projects", href: "#projects", id: 'projects' },
    { name: "Contact", href: "#contact", id: 'contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100 flex items-center gap-1 group cursor-pointer"
          >
            {data.profile.alias}
            <span className="text-purple-600 group-hover:animate-bounce">.</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors relative cursor-pointer ${
                  activeSection === link.id 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full" 
                  />
                )}
              </a>
            ))}
            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button 
              className="text-zinc-900 dark:text-zinc-100 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              onClick={() => setIsOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white dark:bg-zinc-950 px-6 py-8 md:hidden flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
               <span className="text-xl font-bold">{data.profile.alias}.</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-3xl font-light tracking-tight transition-colors cursor-pointer ${
                    activeSection === link.id 
                    ? 'text-purple-600 dark:text-purple-400 font-normal pl-4 border-l-4 border-purple-600' 
                    : 'text-zinc-800 dark:text-zinc-200 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-500 mb-4 text-sm font-medium uppercase tracking-wider">Follow Me</p>
              <div className="flex gap-6">
                {data.socials.map((social) => (
                   <a 
                     key={social.platform}
                     href={social.url}
                     target="_blank"
                     rel="noreferrer"
                     className="text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors transform hover:scale-110"
                   >
                     {social.icon === 'github' && <Github size={28} />}
                     {social.icon === 'linkedin' && <Linkedin size={28} />}
                     {social.icon === 'twitter' && <Twitter size={28} />}
                     {social.icon === 'dribbble' && <Dribbble size={28} />}
                     {social.icon === 'gmail' && <Mail size={28} />}
                     {social.icon === 'whatsapp' && <MessageCircle size={28} />}
                   </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};