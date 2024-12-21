import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface BaseItem {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  path: string;
}

export interface FileItem extends BaseItem {
  type: "file";
  size?: number;
  mime_type?: string;
}

export interface DirectoryItem extends BaseItem {
  type: "directory";
  parent_id: string | null;
}

export const fileService = {
  listAllFiles: async (): Promise<FileItem[]> => {
    const response = await api.get("/files");
    return response.data.map((file: any) => ({ ...file, type: "file" }));
  },

  getFileDetails: async (id: string): Promise<FileItem> => {
    const response = await api.get(`/files/${id}`);
    return { ...response.data, type: "file" };
  },

  uploadFile: async (directoryId: string | null, file: File): Promise<FileItem> => {
    const formData = new FormData();
    formData.append("file", file);
    if (directoryId !== null && directoryId !== "/") {
      formData.append("directory_id", directoryId);
    } else {
      formData.append("directory_id", ""); // Ensure directory_id is an empty string for root
    }

    // Log form data for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`Form data - ${key}:`, value);
    }

    try {
      const response = await api.post("/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File upload response:", response.data);
      return { ...response.data, type: "file" };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("File upload failed with response:", error.response?.data);
      } else {
        console.error("File upload failed with error:", error);
      }
      throw error;
    }
  },

  updateFile: async (id: string, data: { name: string; path: string }): Promise<FileItem> => {
    try {
      console.log(`Updating file with id: ${id}, data:`, data);
      const response = await api.put(`/files/${id}`, data);
      console.log("File update response:", response.data);
      return { ...response.data, type: "file" };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("File update failed with response:", error.response?.data);
      } else {
        console.error("File update failed with error:", error);
      }
      throw error;
    }
  },

  deleteFile: async (id: string): Promise<void> => {
    await api.delete(`/files/${id}`);
  },

  downloadFile: async (id: string): Promise<void> => {
    try {
      const response = await api.get(`/files/${id}/download`, {
        responseType: "blob",
      });

      // Create a URL for the blob and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", response.headers["content-disposition"].split("filename=")[1]);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("File download failed with response:", error.response?.data);
      } else {
        console.error("File download failed with error:", error);
      }
      throw error;
    }
  },

  uploadMultipleFiles: async (directoryId: string | null, files: File[]): Promise<FileItem[]> => {
    const uploads = files.map(file => fileService.uploadFile(directoryId, file));
    const results = await Promise.allSettled(uploads);
    
    const successful: FileItem[] = [];
    const failures: { file: string; error: string }[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        successful.push(result.value);
      } else {
        failures.push({
          file: files[index].name,
          error: result.reason.message
        });
      }
    });

    if (failures.length > 0) {
      console.error('Some files failed to upload:', failures);
    }

    return successful;
  },
};

export const directoryService = {
  listAllDirectories: async (): Promise<DirectoryItem[]> => {
    const response = await api.get("/directories");
    return response.data.map((dir: any) => ({ ...dir, type: "directory" }));
  },

  getSubDirectories: async (id: string | null): Promise<DirectoryItem[]> => {
    const response = await api.get(id ? `/directories/${id}/sub-directories` : `/directories`);
    return response.data.map((dir: any) => ({ ...dir, type: "directory" }));
  },

  getDirectoryFiles: async (id: string | null): Promise<FileItem[]> => {
    const response = await api.get(id ? `/directories/${id}/files` : `/files`);
    return response.data.map((file: any) => ({ ...file, type: "file" }));
  },

  createDirectory: async (data: { name: string; parent_id?: string }): Promise<DirectoryItem> => {
    const response = await api.post("/directories", data);
    return { ...response.data, type: "directory" };
  },

  updateDirectory: async (id: string, data: { name: string }): Promise<DirectoryItem> => {
    const response = await api.put(`/directories/${id}`, data);
    return { ...response.data, type: "directory" };
  },

  deleteDirectory: async (id: string): Promise<void> => {
    await api.delete(`/directories/${id}`);
  },
};

const handleRename = async (id: string, newName: string, currentPath: string) => {
  try {
    const updatedFile = await fileService.updateFile(id, { name: newName, path: currentPath });
    console.log("File renamed successfully:", updatedFile);
  } catch (error) {
    console.error("API Error:", error);
  }
};