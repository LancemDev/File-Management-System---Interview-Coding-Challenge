import React from 'react';
import { FolderIcon, DocumentIcon } from '@heroicons/react/24/outline';

const FileItem = ({ item, onClick }) => {
  const Icon = item.type === 'directory' ? FolderIcon : DocumentIcon;

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex items-center space-x-2"
      onClick={onClick}
    >
      <Icon className="h-6 w-6 text-primary" />
      <span className="truncate">{item.name}</span>
    </div>
  );
};

export default FileItem;

