
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyles = 'font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-brand-purple hover:bg-purple-500 text-white focus:ring-brand-purple shadow-lg shadow-purple-500/20 font-semibold',
    secondary: 'bg-white/15 hover:bg-white/25 text-textPrimary focus:ring-gray-400 border border-white/20',
    danger: 'bg-error hover:bg-red-600 text-white focus:ring-error shadow-lg shadow-red-500/20',
    gradient: 'bg-gradient-primary hover:opacity-90 text-white focus:ring-brand-purple shadow-lg shadow-purple-500/20 font-semibold',
  };

  const sizeStyles = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;