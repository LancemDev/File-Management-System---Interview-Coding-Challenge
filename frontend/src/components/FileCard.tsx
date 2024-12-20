import { File } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileIcon, Trash2Icon, DownloadIcon, PencilIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface FileCardProps {
  file: File;
  onDelete: (id: string) => void;
  onRename: (file: File) => void;
  onDownload: (file: File) => void;
  onClick: (file: File) => void;
}

export function FileCard({ file, onDelete, onRename, onDownload, onClick }: FileCardProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="flex items-center space-x-4" onClick={() => onClick(file)}>
        <div className="p-2 bg-primary/10 rounded-lg">
          <FileIcon className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
          <p className="text-sm text-gray-500">
            Updated {formatDistanceToNow(new Date(file.updated_at))} ago
          </p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDownload(file);
            }}
          >
            <DownloadIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onRename(file);
            }}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(file.id);
            }}
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}