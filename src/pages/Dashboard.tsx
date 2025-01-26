import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import NoteCard from "../components/NoteCard";
import NoteEditor from "../components/NoteEditor";
import { mockFolders, mockTags } from "../data/mockData";
import { Note } from "../types";
import { List, Grid, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

// Base URL for backend API
const API_BASE_URL = "https://noteybe.onrender.com";

export default function Dashboard() {
  const { user } = useAuth(); // Get the current user from AuthContext
  const [activeSection, setActiveSection] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"date" | "title" | "folder">("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch notes from the backend
  useEffect(() => {
    if (!user) return; // Exit if no user is logged in

    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/notes`, {
          params: { userId: user.id }, // Include userId from the current user
        });
        if (Array.isArray(response.data)) {
          setNotes(response.data);
        } else {
          console.error("Unexpected API response:", response.data);
          setNotes([]); // Ensure fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
        setNotes([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [user]);

  const handleTogglePin = async (noteId: number) => {
    try {
      const note = notes.find((n) => n.id === noteId);
      if (note) {
        const updatedNote = { ...note, isPinned: !note.isPinned };
        await axios.put(`${API_BASE_URL}/api/notes/${noteId}`, updatedNote); // Update note in the backend
        setNotes(notes.map((n) => (n.id === noteId ? updatedNote : n)));
      }
    } catch (error) {
      console.error("Error toggling pin:", error);
    }
  };

  const handleToggleFavorite = async (noteId: number) => {
    try {
      const note = notes.find((n) => n.id === noteId);
      if (note) {
        const updatedNote = { ...note, isFavorite: !note.isFavorite };
        await axios.put(`${API_BASE_URL}/api/notes/${noteId}`, updatedNote); // Update note in the backend
        setNotes(notes.map((n) => (n.id === noteId ? updatedNote : n)));
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleNewNote = () => {
    if (!user) return;

    const newNote: Note = {
      id: 0, // Temporary ID, will be assigned by the backend
      userId: user.id, // Associate note with the current user
      title: "Untitled Note",
      content: "",
      tags: [],
      folder: "Personal",
      color: "#FFC1E3",
      isPinned: false,
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSelectedNote(newNote);
    setIsEditorOpen(true);
    setIsSidebarOpen(false);
  };

  const handleSaveNote = async (note: Note) => {
    if (!user || isSaving) return; // Prevent multiple saves
  
    setIsSaving(true); // Disable save button
    try {
      const noteWithUserId = { ...note, userId: user.id }; // Include userId
      if (note.id) {
        const response = await axios.put(`${API_BASE_URL}/api/notes/${note.id}`, noteWithUserId);
        setNotes(notes.map((n) => (n.id === note.id ? response.data : n)));
      } else {
        const response = await axios.post(`${API_BASE_URL}/api/notes`, noteWithUserId);
        setNotes([...notes, response.data]);
      }
      setIsEditorOpen(false);
      setSelectedNote(null);
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setIsSaving(false); // Re-enable save button
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/notes/${noteId}`); // Delete note from the backend
        setNotes(notes.filter((note) => note.id !== noteId));
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  const handleDuplicateNote = async (note: Note) => {
    if (!user) return;

    try {
      const duplicatedNote: Note = {
        ...note,
        id: 0, // Temporary ID, will be assigned by the backend
        userId: user.id, // Associate with the current user
        title: `${note.title} (Copy)`,
        isPinned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const response = await axios.post(`${API_BASE_URL}/api/notes`, duplicatedNote); // Save to the backend
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error("Error duplicating note:", error);
    }
  };

  const filteredNotes = Array.isArray(notes)
    ? notes
        .filter((note) => {
          const matchesSearch = searchQuery
            ? note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              note.content.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

          const matchesSection =
            activeSection === "all"
              ? true
              : activeSection.startsWith("folder-")
              ? note.folder ===
                mockFolders.find(
                  (f) => f.id === parseInt(activeSection.replace("folder-", ""))
                )?.name
              : activeSection.startsWith("tag-")
              ? note.tags.includes(
                  mockTags.find(
                    (t) => t.id === parseInt(activeSection.replace("tag-", ""))
                  )?.name || ""
                )
              : true;

          const matchesDate = selectedDate
            ? new Date(note.createdAt).toDateString() ===
              selectedDate.toDateString()
            : true;

          return matchesSearch && matchesSection && matchesDate;
        })
        .sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;

          switch (sortBy) {
            case "date":
              return (
                new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
              );
            case "title":
              return a.title.localeCompare(b.title);
            case "folder":
              return a.folder.localeCompare(b.folder);
            default:
              return 0;
          }
        })
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex relative z-0">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 p-2 bg-white rounded-lg shadow-md md:hidden z-[70]"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } fixed inset-0 bg-black/20 md:hidden z-[60]`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <div
        className={`
        fixed top-0 left-0 h-screen w-[280px] bg-white/80 backdrop-blur-sm border-r border-pink-100 z-[65]
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:w-64 md:z-10
      `}
      >
        <Sidebar
          folders={mockFolders}
          tags={mockTags}
          activeSection={activeSection}
          onSectionChange={(section) => {
            setActiveSection(section);
            setIsSidebarOpen(false);
          }}
        />
      </div>

      <div className="flex-1 min-h-screen overflow-y-auto relative z-10">
        <div className="pt-14 md:pt-0">
          {/* Header */}
          <Header onNewNote={handleNewNote} onSearch={setSearchQuery} />

          {/* Filters Bar */}
          <div className="bg-white/80 backdrop-blur-sm border-b border-pink-100 px-4 sm:px-6 md:px-8 py-3 relative z-20">
            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg hover:bg-pink-50 transition-all"
                title={
                  viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'
                }
              >
                {viewMode === 'grid' ? (
                  <List className="w-5 h-5 text-gray-600" />
                ) : (
                  <Grid className="w-5 h-5 text-gray-600" />
                )}
              </button>

              <div className="flex-1 min-w-[200px]">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as 'date' | 'title' | 'folder')
                  }
                  className="w-full pl-4 pr-8 py-2 rounded-lg border border-pink-100 focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 transition-all appearance-none bg-white"
                >
                  <option value="date">Sort by Date</option>
                  <option value="title">Sort by Title</option>
                  <option value="folder">Sort by Folder</option>
                </select>
              </div>

              <input
                type="date"
                onChange={(e) =>
                  setSelectedDate(e.target.value ? new Date(e.target.value) : null)
                }
                className="flex-1 min-w-[200px] px-4 py-2 rounded-lg border border-pink-100 focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 transition-all bg-white"
              />

              <div className="text-sm text-gray-500 whitespace-nowrap">
                {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
              </div>
            </div>
          </div>

          {/* Notes Grid/List */}
          <div className="px-4 sm:px-6 md:px-8 py-6">
            {isLoading ? (
              <p>Loading notes...</p>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto"
              >
                {filteredNotes.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 sm:py-20"
                  >
                    <h2 className="text-xl sm:text-2xl font-playfair text-gray-800 mb-2">
                      No notes found
                    </h2>
                    <button
                      onClick={handleNewNote}
                      className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg hover:opacity-90 transition-all"
                    >
                      Create Your First Note
                    </button>
                  </motion.div>
                ) : (
                  <div
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
                        : 'space-y-4'
                    }
                  >
                    <AnimatePresence>
                      {filteredNotes.map((note) => (
                        <motion.div
                          key={note.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                        >
                          <NoteCard
                            note={note}
                            onClick={() => {
                              setSelectedNote(note); // Set the selected note
                              setIsEditorOpen(true); // Open the editor
                            }}
                            onDelete={() => handleDeleteNote(note.id)}
                            onDuplicate={() => handleDuplicateNote(note)}
                            onTogglePin={() => handleTogglePin(note.id)}
                            onToggleFavorite={() => handleToggleFavorite(note.id)}
                            viewMode={viewMode}
                          />

                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isEditorOpen && (
          <NoteEditor
            note={selectedNote}
            onSave={handleSaveNote}
            onClose={() => {
              setIsEditorOpen(false);
              setSelectedNote(null);
            }}
            folders={mockFolders}
            tags={mockTags}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
