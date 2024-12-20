const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  // Files
  getAllFiles: () => 
    fetch(`${API_BASE_URL}/files`).then(res => res.json()),
    
  getFileDetails: (id: string) =>
    fetch(`${API_BASE_URL}/files/${id}`).then(res => res.json()),
    
  uploadFile: (formData: FormData) =>
    fetch(`${API_BASE_URL}/files`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json()),
    
  updateFile: (id: string, data: Partial<File>) =>
    fetch(`${API_BASE_URL}/files/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    
  deleteFile: (id: string) =>
    fetch(`${API_BASE_URL}/files/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),

  // Directories
  getAllDirectories: () =>
    fetch(`${API_BASE_URL}/directories`).then(res => res.json()),
    
  getSubDirectories: (id: string) =>
    fetch(`${API_BASE_URL}/directories/${id}/sub-directories`).then(res => res.json()),
    
  getDirectoryFiles: (id: string) =>
    fetch(`${API_BASE_URL}/directories/${id}/files`).then(res => res.json()),
    
  createDirectory: (data: { name: string; parent_id?: string }) =>
    fetch(`${API_BASE_URL}/directories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    
  updateDirectory: (id: string, data: Partial<Directory>) =>
    fetch(`${API_BASE_URL}/directories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    
  deleteDirectory: (id: string) =>
    fetch(`${API_BASE_URL}/directories/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),
};