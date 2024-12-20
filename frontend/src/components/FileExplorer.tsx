import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fetchDirectoryContents, createDirectory, uploadFile, deleteDirectory } from '../api';
import FileItem from './FileItem';
import FileDetailsDialog from './FileDetailsDialog';
import ActionButton from './ActionButton';

const FileExplorer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState(null);

  const { data, isLoading, error } = useQuery(['directoryContents', id], () => fetchDirectoryContents(id));

  const createDirectoryMutation = useMutation(createDirectory, {
    onSuccess: () => queryClient.invalidateQueries(['directoryContents', id]),
  });

  const uploadFileMutation = useMutation(uploadFile, {
    onSuccess: () => queryClient.invalidateQueries(['directoryContents', id]),
  });

  const deleteDirectoryMutation = useMutation(deleteDirectory, {
    onSuccess: () => {
      queryClient.invalidateQueries(['directoryContents']);
      navigate('/');
    },
  });

  const handleCreateDirectory = () => {
    const name = prompt('Enter directory name:');
    if (name) {
      createDirectoryMutation.mutate({ name, parentId: id });
    }
  };

  const handleUploadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFileMutation.mutate({ file, directoryId: id });
    }
  };

  const handleDeleteDirectory = () => {
    if (confirm('Are you sure you want to delete this directory and all its contents?')) {
      deleteDirectoryMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{data.name || 'Root Directory'}</h1>
        <div className="space-x-2">
          <ActionButton onClick={handleCreateDirectory}>New Directory</ActionButton>
          <ActionButton as="label">
            Upload File
            <input type="file" className="hidden" onChange={handleUploadFile} />
          </ActionButton>
          {id && <ActionButton onClick={() => navigate(-1)}>Back</ActionButton>}
          {id && <ActionButton onClick={handleDeleteDirectory} className="bg-red-500 hover:bg-red-600">Delete Directory</ActionButton>}
        </div>
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {data.directories.map((dir) => (
          <FileItem
            key={dir.id}
            item={dir}
            type="directory"
            onClick={() => navigate(`/directory/${dir.id}`)}
          />
        ))}
        {data.files.map((file) => (
          <FileItem
            key={file.id}
            item={file}
            type="file"
            onClick={() => setSelectedFile(file)}
          />
        ))}
      </motion.div>
      {selectedFile && (
        <FileDetailsDialog
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
          onNavigateToParent={() => {
            setSelectedFile(null);
            navigate(`/directory/${selectedFile.directoryId}`);
          }}
        />
      )}
    </div>
  );
};

export default FileExplorer;

