export interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  folder: string;
  color?: string;
  isPinned?: boolean;
  isFavorite?: boolean;
  lastEditedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string; // Added for user association
}

export interface Folder {
  id: number;
  name: string;
  subfolders: string[];
  icon?: string;
  color?: string;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
  description?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

export type SortOption = 'date' | 'title' | 'folder' | 'created' | 'updated' | 'favorites';
export type ViewMode = 'grid' | 'list' | 'compact';