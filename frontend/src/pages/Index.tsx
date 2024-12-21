import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileItem, DirectoryItem, fileService, directoryService } from "@/services/api";
import { Breadcrumb } from "@/components/FileExplorer/Breadcrumb";
import { FileGrid } from "@/components/FileExplorer/FileGrid";
import { FileDetails } from "@/components/FileExplorer/FileDetails";
import { UploadDialog } from "@/components/FileExplorer/UploadDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FolderPlus, Upload, Loader2, LayoutGrid, List } from "lucide-react";
import { motion } from "framer-motion";

type Item = FileItem | DirectoryItem;

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentDirectory, setCurrentDirectory] = useState<string | null>(null);

  const loadFiles = async () => {
    try {
      setLoading(true);
      if (currentDirectory) {
        const [directories, files] = await Promise.all([
          directoryService.getSubDirectories(currentDirectory),
          directoryService.getDirectoryFiles(currentDirectory),
        ]);
        setItems([...directories, ...files]);
      } else {
        const [directories, files] = await Promise.all([
          directoryService.getSubDirectories(null),
          directoryService.getDirectoryFiles(null),
        ]);
        setItems([...directories, ...files]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load files",
        variant: "destructive",
      });
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, [currentDirectory]);

  const handleItemClick = (item: Item) => {
    if (item.type === "directory") {
      setCurrentDirectory(item.id);
    } else {
      setSelectedItem(item);
    }
  };

  const handleCreateDirectory = async () => {
    const name = prompt("Enter directory name");
    if (!name) return;

    try {
      await directoryService.createDirectory({ 
        name,
        parent_id: currentDirectory || undefined 
      });
      loadFiles();
      toast({
        title: "Success",
        description: "Directory created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create directory",
        variant: "destructive",
      });
      console.error("API Error:", error);
    }
  };

  const handleDeleteItem = async () => {
    if (!selectedItem) return;

    try {
      if (selectedItem.type === "directory") {
        await directoryService.deleteDirectory(selectedItem.id);
      } else {
        await fileService.deleteFile(selectedItem.id);
      }
      setSelectedItem(null);
      loadFiles();
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
      console.error("API Error:", error);
    }
  };

  const handleNavigateUp = () => {
    setCurrentDirectory(null);
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <Breadcrumb path={currentDirectory} />
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            >
              {viewMode === "grid" ? (
                <List className="w-4 h-4" />
              ) : (
                <LayoutGrid className="w-4 h-4" />
              )}
            </Button>
            <Button onClick={handleCreateDirectory}>
              <FolderPlus className="w-4 h-4 mr-2" />
              New Folder
            </Button>
            <Button onClick={() => setIsUploadDialogOpen(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">This folder is empty</p>
          </div>
        ) : (
          <FileGrid items={items} onItemClick={handleItemClick} />
        )}
      </motion.div>

      {selectedItem && (
        <FileDetails
          file={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          onDelete={handleDeleteItem}
          onNavigateUp={handleNavigateUp}
        />
      )}

      <UploadDialog
        currentPath={currentDirectory || "/"}
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onUploadComplete={loadFiles}
      />
    </div>
  );
};

export default Index;