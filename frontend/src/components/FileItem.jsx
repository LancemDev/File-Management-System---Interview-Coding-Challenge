import React from 'react';
import { motion } from 'framer-motion';
import { FolderIcon, DocumentIcon } from '@heroicons/react/24/outline';

const FileItem = ({ item, onClick }) => {
  const Icon = item.type === 'directory' ? FolderIcon : DocumentIcon;

  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center space-x-3">
        <Icon className="h-8 w-8 text-primary-500" />
        <span className="truncate text-gray-700 font-medium">{item.name}</span>
      </div>
    </motion.div>
  );
};

export default FileItem;

