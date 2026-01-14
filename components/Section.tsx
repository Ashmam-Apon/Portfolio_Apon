import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const Section: React.FC<SectionProps> = ({ id, title, children, className = "", delay = 0 }) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-5xl mx-auto px-6">
        {title && (
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="text-3xl md:text-4xl font-bold mb-10 text-zinc-900 dark:text-zinc-100 tracking-tight"
          >
            {title}
          </motion.h2>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};