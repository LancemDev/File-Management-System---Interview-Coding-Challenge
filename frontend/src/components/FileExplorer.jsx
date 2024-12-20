import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import FileItem from './FileItem';
import FileDetailsDialog from './FileDetailsDialogue';
import ActionButton from './ActionButton';
import { PlusIcon, ArrowUpIcon, TrashIcon } from '@heroicons/react/24/outline';

const FileExplorer = () => {
  const [items, setItems] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchItems();
  }, [id]);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      let response;
      if (id) {
        const [dirResponse, fileResponse] = await Promise.all([
          axios.get(`/api/directories/${id}/sub-directories`),
          axios.get(`/api/directories/${id}/files`)
        ]);
        response = [...dirResponse.data, ...fileResponse.data];
      } else {
        response = await axios.get('/api/directories');
      }
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
    setIsLoading(false);
  };

  const handleItemClick = (item) => {
    if (item.type === 'directory') {
      navigate(`/directory/${item.id}`);
    } else {
      setSelectedFile(item);
    }
  };

  const handleCreateDirectory = async () => {
    const name = prompt('Enter directory name:');
    if (name) {
      try {
        await axios.post('/api/directories', { name, parent_id: id });
        fetchItems();
      } catch (error) {
        console.error('Error creating directory:', error);
      }
    }
  };

  const handleUploadFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('directory_id', id);
      try {
        await axios.post('/api/files', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        fetchItems();
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleDeleteDirectory = async () => {
    if (window.confirm('Are you sure you want to delete this directory and all its contents?')) {
      try {
        await axios.delete(`/api/directories/${id}`);
        navigate(-1);
      } catch (error) {
        console.error('Error deleting directory:', error);
      }
    }
  };

  const handleNavigateUp = () => {
    navigate(-1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-primary-600">{id ? 'Directory Contents' : 'Root Directory'}</h2>
        <div className="flex space-x-2">
          <ActionButton onClick={handleCreateDirectory} icon={<PlusIcon className="w-5 h-5" />}>
            New Directory
          </ActionButton>
          <ActionButton onClick={() => fileInputRef.current.click()} icon={<PlusIcon className="w-5 h-5" />}>
            Upload File
          </ActionButton>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleUploadFile}
          />
          {id && <ActionButton onClick={handleNavigateUp} icon={<ArrowUpIcon className="w-5 h-5" />}>Up</ActionButton>}
          {id && (
            <ActionButton onClick={handleDeleteDirectory} className="bg-red-500 hover:bg-red-600" icon={<TrashIcon className="w-5 h-5" />}>
              Delete Directory
            </ActionButton>
          )}
        </div>
      </motion.div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((item) => (
            <FileItem key={item.id} item={item} onClick={() => handleItemClick(item)} />
          ))}
        </motion.div>
      )}
      {selectedFile && (
        <FileDetailsDialog
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
          onDelete={fetchItems}
          onRename={fetchItems}
        />
      )}
    </div>
  );
};

export default FileExplorer;