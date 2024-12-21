import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { fileService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface UploadDialogProps {
  currentPath: string;
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
}

export const UploadDialog = ({
  currentPath,
  isOpen,
  onClose,
  onUploadComplete,
}: UploadDialogProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      try {
        await Promise.all(
          acceptedFiles.map((file) => fileService.uploadFile(currentPath, file))
        );
        toast({
          title: "Success",
          description: "Files uploaded successfully",
        });
        onUploadComplete();
        onClose();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload files",
          variant: "destructive",
        });
        console.error("API Error:", error);
      } finally {
        setUploading(false);
      }
    },
    [currentPath, onClose, onUploadComplete, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={`
            p-8 border-2 border-dashed rounded-lg text-center cursor-pointer
            transition-colors duration-200
            ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-primary"
            }
          `}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};