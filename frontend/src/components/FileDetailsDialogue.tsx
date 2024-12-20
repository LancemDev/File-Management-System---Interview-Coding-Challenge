import { File } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { FileIcon, DownloadIcon, FolderUpIcon, Trash2Icon } from 'lucide-react';
import { format } from 'date-fns';

interface FileDetailsDialogProps {
  file: File | null;
  open: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  onDownload: (file: File) => void;
  onNavigateToParent: () => void;
  onRename: (file: File) => void;
}

export function FileDetailsDialog({
  file,
  open,
  onClose,
  onDelete,
  onDownload,
  onNavigateToParent,
  onRename,
}: FileDetailsDialogProps) {
  if (!file) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileIcon className="h-5 w-5" />
            {file.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Details</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-muted-foreground">Size</p>
              <p>{(file.size / 1024).toFixed(2)} KB</p>
              <p className="text-muted-foreground">Type</p>
              <p>{file.type}</p>
              <p className="text-muted-foreground">Created</p>
              <p>{format(new Date(file.created_at), 'PPP')}</p>
              <p className="text-muted-foreground">Modified</p>
              <p>{format(new Date(file.updated_at), 'PPP')}</p>
            </div>
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => onNavigateToParent()}
          >
            <FolderUpIcon className="mr-2 h-4 w-4" />
            Parent Directory
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => onDownload(file)}
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => onRename(file)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            className="w-full sm:w-auto"
            onClick={() => {
              onDelete(file.id);
              onClose();
            }}
          >
            <Trash2Icon className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}