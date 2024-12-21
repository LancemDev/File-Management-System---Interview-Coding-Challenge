import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileItem, DirectoryItem, fileService } from "@/services/api";
import { Download, Trash, Edit, FolderUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface FileDetailsProps {
  file: FileItem | DirectoryItem;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onNavigateUp: () => void;
}

export const FileDetails = ({
  file,
  isOpen,
  onClose,
  onDelete,
  onNavigateUp,
}: FileDetailsProps) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(file.name);
  const { toast } = useToast();

  const handleDownload = async () => {
    if (file.type !== "file") return;
    
    try {
      const blob = await fileService.downloadFile(file.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive",
      });
      console.error("API Error:", error);
    }
  };

  const handleRename = async () => {
    try {
      if (file.type === "file") {
        await fileService.updateFile(file.id, { name: newName });
      } else {
        await fileService.updateFile(file.id, { name: newName });
      }
      setIsRenaming(false);
      onClose();
      toast({
        title: "Success",
        description: "Item renamed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to rename item",
        variant: "destructive",
      });
      console.error("API Error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isRenaming ? "Rename Item" : "Item Details"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {isRenaming ? (
            <div className="flex items-center space-x-2">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleRename}>Save</Button>
              <Button variant="outline" onClick={() => setIsRenaming(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-500">Name:</span>
                <span>{file.name}</span>
                <span className="text-gray-500">Type:</span>
                <span>{file.type}</span>
                {file.type === "file" && file.size && (
                  <>
                    <span className="text-gray-500">Size:</span>
                    <span>{Math.round(file.size / 1024)} KB</span>
                  </>
                )}
                <span className="text-gray-500">Created:</span>
                <span>{new Date(file.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-end space-x-2">
                {file.type === "file" && (
                  <Button onClick={handleDownload} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                )}
                <Button onClick={() => setIsRenaming(true)} variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Rename
                </Button>
                <Button onClick={onNavigateUp} variant="outline">
                  <FolderUp className="w-4 h-4 mr-2" />
                  Up
                </Button>
                <Button onClick={onDelete} variant="destructive">
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};