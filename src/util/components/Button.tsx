import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

type ButtonType = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonType;
  isLoading?: boolean;
}

// Convert native props to motion props for the framer-motion element
type MotionButtonProps = HTMLMotionProps<'button'> & ButtonProps;

export const Button: React.FC<MotionButtonProps> = ({
  children,
  variant = 'primary',
  isLoading,
  className = '',
  ...props
}) => {
  const baseStyles = 'px-4 py-2 font-semibold rounded-lg shadow-sm focus:outline-none transition-colors duration-200 flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    secondary: 'bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-600',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
    ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-slate-800 shadow-none',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading || props.disabled}
      className={`${baseStyles} ${variants[variant]} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
      ) : (
        children
      )}
    </motion.button>
  );
};
