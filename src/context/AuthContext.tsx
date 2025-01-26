import React, { createContext, useContext, useState, useEffect } from 'react';
import bcrypt from 'bcryptjs'; // For hashing passwords
import { User } from '../types';
import defaultUsers from '../data/users.json';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, avatar: File) => Promise<void>;
  updateUser: (updatedData: Partial<User>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const BASE_URL = 'https://noteybe.onrender.com';


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize users in localStorage if not present
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      localStorage.setItem('users', JSON.stringify(defaultUsers.users));
    }

    // Check for saved session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const getUsers = async (): Promise<User[]> => {
    try {
      const response = await fetch(`${BASE_URL}/api/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (err) {
      console.error('Error fetching users:', err);
      throw err;
    }
  };

  const saveUsers = async (users: User[]): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(users),
      });

      if (!response.ok) {
        throw new Error('Failed to save users');
      }
    } catch (err) {
      console.error('Error saving users:', err);
      throw err;
    }
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch(`${BASE_URL}/api/upload-avatar`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload avatar');
      }

      const data = await response.json();
      return data.filePath; // Returns the file path for saving
    } catch (err) {
      console.error('Error uploading avatar:', err);
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const users = await getUsers(); // Await `getUsers`
      const foundUser = users.find((u: User) => u.email === email);
      if (!foundUser) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, foundUser.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, avatarFile: File) => {
    setIsLoading(true);
    setError(null);

    try {
      // Upload the avatar
      const avatarUrl = await uploadAvatar(avatarFile);

      // Fetch existing users
      const users = await getUsers();
      if (users.some((u: User) => u.email === email)) {
        throw new Error('Email already exists');
      }

      // Hash the password and create the new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: User = {
        id: String(users.length + 1),
        email,
        password: hashedPassword,
        name,
        avatar: avatarUrl, // Save the uploaded avatar URL
        createdAt: new Date().toISOString(),
      };

      // Save the updated user list
      users.push(newUser);
      await saveUsers(users);

      // Update the frontend state
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updatedData: Partial<User>) => {
    setIsLoading(true);
    setError(null);

    try {
      const users = await getUsers();
      const currentUserIndex = users.findIndex((u) => u.id === user?.id);

      if (currentUserIndex === -1) {
        throw new Error('User not found');
      }

      const updatedUser = { ...users[currentUserIndex], ...updatedData };
      users[currentUserIndex] = updatedUser;

      await saveUsers(users);

      // Update frontend state
      const { password: _, ...userWithoutPassword } = updatedUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
