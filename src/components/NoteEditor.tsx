import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  X, Save, FolderHeart as FolderIcon, Tag as TagIcon, Image, Link, 
  List, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Heading1, Heading2, Quote, Code, ListOrdered, Undo, Redo
} from 'lucide-react';
import { Note, Folder, Tag } from '../types';

interface NoteEditorProps {
  note: Note | null;
  onSave: (note: Note) => void;
  onClose: () => void;
  folders: Folder[];
  tags: Tag[];
}

export default function NoteEditor({ note, onSave, onClose, folders, tags }: NoteEditorProps) {
  const [editedNote, setEditedNote] = useState<Note>({
    id: 0,
    title: '',
    content: '',
    tags: [],
    folder: 'Personal',
    color: '#FFC1E3',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const [selectedColor, setSelectedColor] = useState('#FFC1E3');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const colors = ['#FFC1E3', '#B8E8D2', '#D9C6F2', '#E3C5A2', '#FFDFE5'];

  useEffect(() => {
    if (note) {
      setEditedNote(note);
      setSelectedColor(note.color || '#FFC1E3');
    }
  }, [note]);

  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onSave({
        ...editedNote,
        content,
        color: selectedColor,
        updatedAt: new Date()
      });
    }
  };

  const toggleTag = (tagName: string) => {
    setEditedNote(prev => ({
      ...prev,
      tags: prev.tags.includes(tagName)
        ? prev.tags.filter(t => t !== tagName)
        : [...prev.tags, tagName]
    }));
  };

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const formatButtons = [
    { icon: <Bold className="w-4 h-4" />, command: 'bold', title: 'Bold (Ctrl+B)' },
    { icon: <Italic className="w-4 h-4" />, command: 'italic', title: 'Italic (Ctrl+I)' },
    { icon: <Underline className="w-4 h-4" />, command: 'underline', title: 'Underline (Ctrl+U)' },
    { icon: <Heading1 className="w-4 h-4" />, command: 'formatBlock', value: '<h1>', title: 'Heading 1' },
    { icon: <Heading2 className="w-4 h-4" />, command: 'formatBlock', value: '<h2>', title: 'Heading 2' },
    { icon: <Quote className="w-4 h-4" />, command: 'formatBlock', value: '<blockquote>', title: 'Quote' },
    { icon: <Code className="w-4 h-4" />, command: 'formatBlock', value: '<pre>', title: 'Code Block' },
    { icon: <List className="w-4 h-4" />, command: 'insertUnorderedList', title: 'Bullet List' },
    { icon: <ListOrdered className="w-4 h-4" />, command: 'insertOrderedList', title: 'Numbered List' },
    { icon: <AlignLeft className="w-4 h-4" />, command: 'justifyLeft', title: 'Align Left' },
    { icon: <AlignCenter className="w-4 h-4" />, command: 'justifyCenter', title: 'Align Center' },
    { icon: <AlignRight className="w-4 h-4" />, command: 'justifyRight', title: 'Align Right' },
    { icon: <Link className="w-4 h-4" />, command: 'createLink', value: '', title: 'Insert Link' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="border-b border-pink-100 p-4 flex items-center justify-between">
          <input
            type="text"
            value={editedNote.title}
            onChange={e => setEditedNote(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Note Title"
            className="text-xl sm:text-2xl font-playfair w-full focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg hover:opacity-90 transition-all text-sm sm:text-base"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all"
            >
              <X className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Formatting Toolbar */}
        <div className="border-b border-pink-100 p-2 flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => document.execCommand('undo')}
            className="p-1.5 rounded hover:bg-pink-50 transition-all"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => document.execCommand('redo')}
            className="p-1.5 rounded hover:bg-pink-50 transition-all"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4 text-gray-600" />
          </button>
          
          <div className="w-px h-4 bg-pink-100 mx-1" />
          
          {formatButtons.map((button, index) => (
            <React.Fragment key={index}>
              <button
                onClick={() => handleFormat(button.command, button.value)}
                className="p-1.5 rounded hover:bg-pink-50 transition-all"
                title={button.title}
              >
                {button.icon}
              </button>
              {(index + 1) % 3 === 0 && <div className="w-px h-4 bg-pink-100 mx-1" />}
            </React.Fragment>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <div
                ref={editorRef}
                contentEditable
                dangerouslySetInnerHTML={{ __html: editedNote.content }}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                className="min-h-[300px] sm:min-h-[500px] p-4 rounded-lg border border-pink-100 focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 transition-all outline-none overflow-auto whitespace-pre-wrap"
                style={{ backgroundColor: `${selectedColor}10` }}
              />
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FolderIcon className="w-4 h-4 text-pink-400" />
                  <h3 className="text-sm font-semibold text-gray-600">Folder</h3>
                </div>
                <select
                  value={editedNote.folder}
                  onChange={e => setEditedNote(prev => ({ ...prev, folder: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-pink-100 focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 transition-all text-sm"
                >
                  {folders.map(folder => (
                    <option key={folder.id} value={folder.name}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TagIcon className="w-4 h-4 text-pink-400" />
                  <h3 className="text-sm font-semibold text-gray-600">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag.id}
                      onClick={() => toggleTag(tag.name)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        editedNote.tags.includes(tag.name)
                          ? 'bg-pink-400 text-white'
                          : 'bg-pink-50 text-pink-400'
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Note Color</h3>
                <div className="flex gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full transition-all ${
                        selectedColor === color ? 'ring-2 ring-offset-2 ring-pink-400' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}