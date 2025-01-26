import React, { useState } from 'react';
import { Search, Plus, Mic } from 'lucide-react';
import UserProfile from './UserProfile';

interface HeaderProps {
  onNewNote: () => void;
  onSearch: (query: string) => void;
}

export default function Header({ onNewNote, onSearch }: HeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-pink-100 px-4 sm:px-6 md:px-8 py-4 mt-14 md:mt-0 z-40 relative">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Find your brilliance..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all bg-white ${
              isSearchFocused
                ? 'border-pink-300 ring ring-pink-200 ring-opacity-50'
                : 'border-pink-100'
            }`}
            onChange={(e) => onSearch(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-full text-gray-600 hover:bg-pink-50 transition-all hidden sm:flex"
            title="Voice Input"
          >
            <Mic className="w-5 h-5" />
          </button>

          <button
            onClick={onNewNote}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg hover:opacity-90 transition-all flex-1 sm:flex-none"
          >
            <Plus className="w-5 h-5" />
            <span>New Note</span>
          </button>

          <UserProfile />
        </div>
      </div>
    </div>
  );
}
