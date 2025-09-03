
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  const baseStyles = 'w-full px-3 py-2 bg-black/30 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple text-textPrimary placeholder-textMuted shadow-sm';
  
  return <input className={`${baseStyles} ${className}`} {...props} />;
};

export default Input;