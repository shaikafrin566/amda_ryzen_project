import React from 'react';
import './GlassCard.css';

const GlassCard = ({ children, className = '', ...props }) => {
  return (
    <div className={`glass-card-component ${className}`} {...props}>
      {children}
    </div>
  );
};

export default GlassCard;
