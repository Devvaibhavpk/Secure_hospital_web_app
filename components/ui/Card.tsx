
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-black/30 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/20 p-6 transition-all duration-200 hover:shadow-2xl hover:border-white/30 ${className}`}>
            {children}
        </div>
    );
};

export default Card;