import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Trash2,
  LogOut,
  ChevronLeft,
  Save,
  Loader,
  Image,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth(); // Use `updateUser` for saving updates
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('account');

  // Form states
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare the data to be updated
      const updatedData = { name, email };

      if (profilePicture) {
        // If a new profile picture is uploaded, handle its upload
        const formData = new FormData();
        formData.append('avatar', profilePicture);

        const response = await fetch('http://localhost:5000/api/upload-avatar', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload avatar');
        }

        const data = await response.json();
        updatedData.avatar = data.filePath; // Save the avatar path
      }

      // Save updated user data
      await updateUser(updatedData);

      alert('Account updated successfully!');
    } catch (error) {
      console.error('Error updating account:', error);
      alert('Failed to update account.');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'danger', label: 'Danger Zone', icon: Trash2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/app')}
              className="p-2 rounded-lg hover:bg-white/50 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-playfair">Settings</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            {/* Tabs */}
            <div className="sm:w-64 border-b sm:border-b-0 sm:border-r border-pink-100">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-pink-50 text-pink-600'
                      : 'hover:bg-pink-50/50 text-gray-600'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {activeTab === 'account' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <form onSubmit={handleSaveAccount} className="space-y-4">
                    <div className="text-center">
                      <div className="relative inline-block">
                        {/* Show existing profile picture */}
                        {user?.avatar ? (
                          <img
                            src={`http://localhost:5000${user.avatar}`}
                            alt={user.name}
                            className="w-20 h-20 rounded-full object-cover border-2 border-pink-400"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white text-xl font-medium">
                            {user?.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        {/* Upload button */}
                        <label
                          htmlFor="upload-avatar"
                          className="absolute bottom-0 right-0 bg-pink-500 text-white w-6 h-6 flex items-center justify-center rounded-full cursor-pointer"
                        >
                          <Image className="w-4 h-4" />
                          <input
                            id="upload-avatar"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              setProfilePicture(
                                e.target.files ? e.target.files[0] : null
                              )
                            }
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <div className="relative">
                        <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-pink-100 focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-pink-100 focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
