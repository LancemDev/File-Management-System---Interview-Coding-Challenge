import React from 'react';
import { motion } from 'framer-motion';

const ActionButton = ({ children, className = '', icon, ...props }) => {
  return (
    <motion.button
      className={`px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 flex items-center space-x-2 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default ActionButton;

