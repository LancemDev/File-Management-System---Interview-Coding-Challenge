import { Directory } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FolderIcon, Trash2Icon, PencilIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DirectoryCardProps {
  directory: Directory;
  onDelete: (id: string) => void;
  onRename: (directory: Directory) => void;
  onClick: (directory: Directory) => void;
}

export function DirectoryCard({ directory, onDelete, onRename, onClick }: DirectoryCardProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="flex items-center space-x-4" onClick={() => onClick(directory)}>
        <div className="p-2 bg-primary/10 rounded-lg">
          <FolderIcon className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{directory.name}</p>
          <p className="text-sm text-gray-500">
            Updated {formatDistanceToNow(new Date(directory.updated_at))} ago
          </p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onRename(directory);
            }}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(directory.id);
            }}
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}