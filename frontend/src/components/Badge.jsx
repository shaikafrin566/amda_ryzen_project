import React from 'react';
import { motion } from 'framer-motion';
import './Badge.css';

const Badge = ({ icon: Icon, title, description, unlocked = false }) => {
  return (
    <motion.div 
      className={`badge-component ${unlocked ? 'unlocked' : 'locked'}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="badge-icon-wrapper">
        <Icon size={32} className="badge-icon" />
        {unlocked && <div className="badge-glow" />}
      </div>
      <div className="badge-info">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

export default Badge;
