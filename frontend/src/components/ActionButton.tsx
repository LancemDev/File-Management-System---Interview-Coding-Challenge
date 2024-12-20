import { motion } from 'framer-motion';

const ActionButton = ({ children, className = '', ...props }) => {
  return (
    <motion.button
      className={`px-4 py-2 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default ActionButton;

