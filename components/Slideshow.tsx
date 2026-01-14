import React, { useState, useEffect } from 'react';
import { Section } from './Section';
import { usePortfolio } from '../context/PortfolioContext';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Slideshow: React.FC = () => {
  const { data } = usePortfolio();
  const [current, setCurrent] = useState(0);

  if (!data.slideshow || data.slideshow.length === 0) return null;

  const next = () => setCurrent((c) => (c + 1) % data.slideshow.length);
  const prev = () => setCurrent((c) => (c - 1 + data.slideshow.length) % data.slideshow.length);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [data.slideshow.length]);

  return (
    <Section title="Gallery & Interests" className="bg-zinc-100 dark:bg-zinc-900/30">
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl group">
        <AnimatePresence mode='wait'>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img 
              src={data.slideshow[current].image} 
              alt={data.slideshow[current].caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <div className="flex items-center gap-2 text-white/80 mb-2">
                 <ImageIcon size={16} />
                 <span className="text-sm font-medium uppercase tracking-wider">Featured</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {data.slideshow[current].caption}
              </h3>
            </div>
          </motion.div>
        </AnimatePresence>

        <button 
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-4 right-8 flex gap-2">
          {data.slideshow.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};
