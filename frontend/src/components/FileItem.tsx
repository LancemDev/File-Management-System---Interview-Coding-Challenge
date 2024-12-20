import { motion } from 'framer-motion';
import { FolderIcon, FileIcon } from '@heroicons/react/24/outline';

const FileItem = ({ item, type, onClick }) => {
  const Icon = type === 'directory' ? FolderIcon : FileIcon;

  return (
    <motion.div
      className="bg-surface rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="flex items-center space-x-2">
        <Icon className="w-6 h-6 text-primary" />
        <span className="font-medium truncate">{item.name}</span>
      </div>
    </motion.div>
  );
};

export default FileItem;

