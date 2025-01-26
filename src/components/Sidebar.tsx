import React from 'react';
import { Folder, Tag } from '../types';
import { Notebook, Tag as TagIcon, Settings, FolderHeart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  folders: Folder[];
  tags: Tag[];
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ folders, tags, activeSection, onSectionChange }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <aside className="h-full overflow-y-auto flex flex-col bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-3 p-4 md:p-6 border-b border-pink-100 mt-14 md:mt-0">
        <Notebook className="w-6 sm:w-8 h-6 sm:h-8 text-pink-400" />
        <h1 className="text-xl sm:text-2xl font-playfair text-gray-800">Notes</h1>
      </div>

      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 px-2">
            <FolderHeart className="w-4 h-4 text-pink-400" />
            <h2 className="text-sm font-semibold text-gray-600">Folders</h2>
          </div>
          <ul className="space-y-1">
            {folders.map(folder => (
              <li key={folder.id}>
                <button
                  onClick={() => onSectionChange(`folder-${folder.id}`)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                    activeSection === `folder-${folder.id}`
                      ? 'bg-pink-50 text-pink-600'
                      : 'text-gray-600 hover:bg-pink-50/50'
                  }`}
                >
                  {folder.name}
                </button>
                {folder.subfolders.length > 0 && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {folder.subfolders.map(subfolder => (
                      <li key={subfolder}>
                        <button
                          onClick={() => onSectionChange(`subfolder-${subfolder}`)}
                          className="w-full text-left px-4 py-2 text-sm rounded-lg transition-all text-gray-500 hover:bg-pink-50/50"
                        >
                          {subfolder}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 px-2">
            <TagIcon className="w-4 h-4 text-pink-400" />
            <h2 className="text-sm font-semibold text-gray-600">Tags</h2>
          </div>
          <div className="flex flex-wrap gap-2 px-2">
            {tags.map(tag => (
              <button
                key={tag.id}
                onClick={() => onSectionChange(`tag-${tag.id}`)}
                className="px-3 py-1.5 rounded-full text-sm transition-all"
                style={{
                  backgroundColor: `${tag.color}20`,
                  color: tag.color,
                }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <button
        onClick={() => navigate('/settings')}
        className="flex items-center gap-2 px-6 py-4 text-gray-600 hover:bg-pink-50 transition-all border-t border-pink-100"
      >
        <Settings className="w-4 h-4" />
        Settings
      </button>
    </aside>
  );
}