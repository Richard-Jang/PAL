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
  const baseStyles = 'px-4 py-2 font-semibold rounded-lg shadow-sm focus:outline-none transition-all duration-200 flex items-center justify-center gap-2 border';

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 via-purple-600 to-fuchsia-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-fuchsia-700 border-transparent active:scale-95 shadow-purple-500/30',
    secondary: 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200 active:bg-slate-100 shadow-sm hover:border-purple-300',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200 active:bg-red-200',
    ghost: 'bg-transparent text-slate-600 hover:text-purple-600 hover:bg-purple-50 shadow-none border-transparent',
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
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
      ) : (
        children
      )}
    </motion.button>
  );
};
