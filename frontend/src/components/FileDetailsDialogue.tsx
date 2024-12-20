import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFile, renameFile, downloadFile } from '../api';
import ActionButton from './ActionButton';

const FileDetailsDialog = ({ file, onClose, onNavigateToParent }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteFile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['directoryContents', file.directoryId]);
      onClose();
    },
  });

  const renameMutation = useMutation(renameFile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['directoryContents', file.directoryId]);
      onClose();
    },
  });

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this file?')) {
      deleteMutation.mutate(file.id);
    }
  };

  const handleRename = () => {
    const newName = prompt('Enter new file name:', file.name);
    if (newName && newName !== file.name) {
      renameMutation.mutate({ id: file.id, name: newName });
    }
  };

  const handleDownload = () => {
    downloadFile(file.id);
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  File Details
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Name: {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Size: {file.size} bytes
                  </p>
                  <p className="text-sm text-gray-500">
                    Type: {file.type}
                  </p>
                </div>

                <div className="mt-4 space-x-2">
                  <ActionButton onClick={handleDownload}>Download</ActionButton>
                  <ActionButton onClick={handleRename}>Rename</ActionButton>
                  <ActionButton onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Delete</ActionButton>
                  <ActionButton onClick={onNavigateToParent}>Go to Parent</ActionButton>
                  <ActionButton onClick={onClose}>Close</ActionButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FileDetailsDialog;

