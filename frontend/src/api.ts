import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchDirectoryContents = async (id = null) => {
  const endpoint = id ? `/directories/${id}` : '/files';
  const { data } = await api.get(endpoint);
  return data;
};

export const createDirectory = async ({ name, parentId }) => {
  const { data } = await api.post('/directories', { name, parent_id: parentId });
  return data;
};

export const uploadFile = async ({ file, directoryId }) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('directory_id', directoryId);
  const { data } = await api.post('/files', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const deleteDirectory = async (id) => {
  await api.delete(`/directories/${id}`);
};

export const deleteFile = async (id) => {
  await api.delete(`/files/${id}`);
};

export const renameFile = async ({ id, name }) => {
  const { data } = await api.put(`/files/${id}`, { name });
  return data;
};

export const downloadFile = async (id) => {
  const { data } = await api.get(`/files/${id}/download`, { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'file');
  document.body.appendChild(link);
  link.click();
  link.remove();
};

