import React from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ActionButton from './ActionButton';
import { ArrowDownTrayIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

const FileDetailsDialog = ({ file, onClose, onDelete, onRename }) => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(`/api/files/${file.id}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await axios.delete(`/api/files/${file.id}`);
        onDelete();
        onClose();
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  };

  const handleRename = async () => {
    const newName = prompt('Enter new file name:', file.name);
    if (newName && newName !== file.name) {
      try {
        await axios.put(`/api/files/${file.id}`, { name: newName });
        onRename();
        onClose();
      } catch (error) {
        console.error('Error renaming file:', error);
      }
    }
  };

  return (
    <AnimatePresence>
      <Dialog open={true} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <motion.div 
            className="bg-white rounded-lg p-6 w-full max-w-md mx-auto z-20 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Dialog.Title className="text-2xl font-semibold mb-4 text-primary-600">File Details</Dialog.Title>
            <div className="space-y-2 mb-6">
              <p><strong>Name:</strong> {file.name}</p>
              <p><strong>Type:</strong> {file.type}</p>
              <p><strong>Size:</strong> {file.size} bytes</p>
            </div>
            <div className="flex justify-end space-x-2">
              <ActionButton onClick={handleDownload} icon={<ArrowDownTrayIcon className="w-5 h-5" />}>
                Download
              </ActionButton>
              <ActionButton onClick={handleRename} icon={<PencilIcon className="w-5 h-5" />}>
                Rename
              </ActionButton>
              <ActionButton onClick={handleDelete} className="bg-red-500 hover:bg-red-600" icon={<TrashIcon className="w-5 h-5" />}>
                Delete
              </ActionButton>
              <ActionButton onClick={onClose} icon={<XMarkIcon className="w-5 h-5" />}>
                Close
              </ActionButton>
            </div>
          </motion.div>
        </div>
      </Dialog>
    </AnimatePresence>
  );
};

export default FileDetailsDialog;