export interface File {
    id: string;
    name: string;
    size: number;
    type: string;
    path: string;
    created_at: string;
    updated_at: string;
    directory_id: string;
  }
  
  export interface Directory {
    id: string;
    name: string;
    path: string;
    parent_id: string | null;
    created_at: string;
    updated_at: string;
  }