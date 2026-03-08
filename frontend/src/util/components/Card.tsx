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
      whileHover={hoverable ? { y: -4, boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.15)' } : {}}
      className={`bg-slate-50 border border-slate-200 rounded-2xl shadow-sm p-6 overflow-hidden relative ${className}`}
      {...props}
    >
      {/* Subtle modern top lighting gradient effect */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-magenta-500 opacity-20" />
      {children}
    </motion.div>
  );
};

// Optional Sub-components for structure
export const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`mb-4 flex items-start justify-between ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-xl font-bold text-slate-800 ${className}`}>{children}</h3>
);

export const CardBody = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`text-slate-600 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`mt-6 pt-4 border-t border-slate-100 flex items-center justify-between ${className}`}>{children}</div>
);
