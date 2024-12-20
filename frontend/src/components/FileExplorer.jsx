import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileItem from './FileItem';
import FileDetailsDialog from './FileDetailsDialogue';
import ActionButton from './ActionButton';

const FileExplorer = () => {
  const [items, setItems] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, [id]);

  const fetchItems = async () => {
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{id ? 'Directory Contents' : 'Root Directory'}</h2>
        <div className="space-x-2">
          <ActionButton onClick={handleCreateDirectory}>New Directory</ActionButton>
          <ActionButton as="label">
            Upload File
            <input type="file" className="hidden" onChange={handleUploadFile} />
          </ActionButton>
          {id && <ActionButton onClick={handleNavigateUp}>Up</ActionButton>}
          {id && <ActionButton onClick={handleDeleteDirectory} className="bg-red-500 hover:bg-red-600">Delete Directory</ActionButton>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <FileItem key={item.id} item={item} onClick={() => handleItemClick(item)} />
        ))}
      </div>
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

