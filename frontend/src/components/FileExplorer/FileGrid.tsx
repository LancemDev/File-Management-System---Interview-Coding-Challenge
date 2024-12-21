import { FileItem, DirectoryItem } from "@/services/api";
import { File, Folder } from "lucide-react";
import { motion } from "framer-motion";

interface FileGridProps {
  items: (FileItem | DirectoryItem)[];
  onItemClick: (item: FileItem | DirectoryItem) => void;
}

export const FileGrid = ({ items, onItemClick }: FileGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={`${item.type}-${item.id}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          onClick={() => onItemClick(item)}
          className="group relative p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-all duration-200 hover:shadow-lg"
        >
          <div className="flex flex-col items-center space-y-2">
            {item.type === "directory" ? (
              <Folder className="w-12 h-12 text-yellow-500" />
            ) : (
              <File className="w-12 h-12 text-blue-500" />
            )}
            <span className="text-sm text-center font-medium text-gray-700 group-hover:text-gray-900 truncate w-full">
              {item.name}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};