import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' } : {}}
      className={`bg-slate-900 border border-slate-800 rounded-2xl shadow-lg p-6 overflow-hidden relative ${className}`}
      {...props}
    >
      {/* Subtle modern top lighting gradient effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};

// Optional Sub-components for structure
export const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`mb-4 flex items-start justify-between ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-xl font-bold text-slate-50 ${className}`}>{children}</h3>
);

export const CardBody = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`text-slate-300 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`mt-6 pt-4 border-t border-slate-800 flex items-center justify-between ${className}`}>{children}</div>
);
