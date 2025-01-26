import React, { useState } from 'react';
import { Note } from '../types';
import { Calendar, Tag as TagIcon, MoreVertical, Trash, Copy, Edit, Pin, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NoteCardProps {
  note: Note;
  onClick: (note: Note) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onTogglePin?: () => void;
  onToggleFavorite?: () => void;
  viewMode: 'grid' | 'list' | 'compact';
}

export default function NoteCard({ 
  note, 
  onClick, 
  onDelete, 
  onDuplicate,
  onTogglePin,
  onToggleFavorite,
  viewMode 
}: NoteCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
    setShowMenu(false);
  };

  return (
    <article
      className={`bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border border-pink-100 dark:border-gray-700 group relative ${
        viewMode === 'list' 
          ? 'flex gap-4 sm:gap-6 h-[160px]' 
          : viewMode === 'compact'
          ? 'h-[200px] flex flex-col'
          : 'h-[280px] flex flex-col'
      }`}
      onClick={() => onClick(note)}
    >
      {/* Pin and Favorite Buttons */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-2 z-10">
        {onTogglePin && (
          <button
            onClick={(e) => handleAction(e, onTogglePin)}
            className={`p-1.5 rounded-lg transition-all ${
              note.isPinned 
                ? 'text-pink-400 bg-pink-50 dark:bg-pink-900/20' 
                : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100'
            }`}
            title={note.isPinned ? 'Unpin note' : 'Pin note'}
          >
            <Pin className={`w-4 h-4 ${note.isPinned ? 'fill-current' : ''} transform -rotate-45`} />
          </button>
        )}
        {onToggleFavorite && (
          <button
            onClick={(e) => handleAction(e, onToggleFavorite)}
            className={`p-1.5 rounded-lg transition-all ${
              note.isFavorite 
                ? 'text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' 
                : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100'
            }`}
            title={note.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className={`w-4 h-4 ${note.isFavorite ? 'fill-current' : ''}`} />
          </button>
        )}
        <button
          onClick={handleMenuClick}
          className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all opacity-0 group-hover:opacity-100"
          title="More options"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-12 sm:top-14 right-2 sm:right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-pink-100 dark:border-gray-700 py-1 z-20"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={(e) => handleAction(e, () => onClick(note))}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={(e) => handleAction(e, onDuplicate)}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Duplicate
            </button>
            <button
              onClick={(e) => handleAction(e, onDelete)}
              className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
            >
              <Trash className="w-4 h-4" />
              Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`${viewMode === 'list' ? 'flex-1 min-w-0 flex flex-col' : 'flex-1 flex flex-col'}`}>
        <h3 className="text-lg font-playfair mb-2 text-gray-800 dark:text-white pr-24 truncate">{note.title}</h3>
        <div className="flex-1 overflow-hidden relative">
          <div 
            className="absolute inset-0 overflow-y-auto scrollbar-thin pr-2 text-gray-600 dark:text-gray-300 text-sm"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        </div>
        
        <div className={`flex flex-wrap items-center gap-y-2 mt-4 ${viewMode === 'list' ? 'justify-end gap-x-6' : 'justify-between'}`}>
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                style={{
                  backgroundColor: `${note.color}20`,
                  color: note.color,
                }}
              >
                <TagIcon className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 text-xs whitespace-nowrap">
            <Calendar className="w-3 h-3" />
            {new Date(note.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </article>
  );
}
