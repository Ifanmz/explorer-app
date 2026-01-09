// frontend/src/api/folderApi.ts
import axios from "axios";

/**
 * Represents a folder or file in the file system
 */
export interface Folder {
  id: number;
  name: string;
  parentId: number | null;
  type?: string;
}

/**
 * Axios instance configured for folder API requests
 */
const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
});

/**
 * Mock data fallback containing sample folder structure
 * Used when API requests fail or during development
 */
const mockFolders: Folder[] = [
  // Root level
  { id: 1, name: 'Documents', parentId: null, type: 'folder' },
  { id: 2, name: 'Pictures', parentId: null, type: 'folder' },
  { id: 3, name: 'Music', parentId: null, type: 'folder' },
  { id: 4, name: 'Videos', parentId: null, type: 'folder' },
  { id: 5, name: 'Downloads', parentId: null, type: 'folder' },
  
  // Documents children
  { id: 6, name: 'Work', parentId: 1, type: 'folder' },
  { id: 7, name: 'Personal', parentId: 1, type: 'folder' },
  { id: 8, name: 'Projects', parentId: 1, type: 'folder' },
  { id: 9, name: 'resume.pdf', parentId: 1, type: 'file' },
  
  // Work children
  { id: 10, name: 'Reports', parentId: 6, type: 'folder' },
  { id: 11, name: 'Presentations', parentId: 6, type: 'folder' },
  { id: 12, name: 'meeting-notes.docx', parentId: 6, type: 'file' },
  
  // Reports children
  { id: 13, name: 'Q1 2024', parentId: 10, type: 'folder' },
  { id: 14, name: 'Q2 2024', parentId: 10, type: 'folder' },
  { id: 15, name: 'annual-report.xlsx', parentId: 10, type: 'file' },
  
  // Q1 2024 children
  { id: 16, name: 'January', parentId: 13, type: 'folder' },
  { id: 17, name: 'February', parentId: 13, type: 'folder' },
  { id: 18, name: 'March', parentId: 13, type: 'folder' },
  
  // Personal children
  { id: 19, name: 'Recipes', parentId: 7, type: 'folder' },
  { id: 20, name: 'Travel Plans', parentId: 7, type: 'folder' },
  
  // Projects children
  { id: 21, name: 'Website Redesign', parentId: 8, type: 'folder' },
  { id: 22, name: 'Mobile App', parentId: 8, type: 'folder' },
  { id: 23, name: 'API Integration', parentId: 8, type: 'folder' },
  
  // Website Redesign children
  { id: 24, name: 'Mockups', parentId: 21, type: 'folder' },
  { id: 25, name: 'Assets', parentId: 21, type: 'folder' },
  { id: 26, name: 'index.html', parentId: 21, type: 'file' },
  { id: 27, name: 'styles.css', parentId: 21, type: 'file' },
  
  // Pictures children
  { id: 28, name: 'Vacation 2023', parentId: 2, type: 'folder' },
  { id: 29, name: 'Family', parentId: 2, type: 'folder' },
  { id: 30, name: 'Screenshots', parentId: 2, type: 'folder' },
  { id: 31, name: 'wallpaper.jpg', parentId: 2, type: 'file' },
  
  // Vacation 2023 children
  { id: 32, name: 'Beach', parentId: 28, type: 'folder' },
  { id: 33, name: 'Mountains', parentId: 28, type: 'folder' },
  
  // Music children
  { id: 34, name: 'Rock', parentId: 3, type: 'folder' },
  { id: 35, name: 'Jazz', parentId: 3, type: 'folder' },
  { id: 36, name: 'Classical', parentId: 3, type: 'folder' },
  { id: 37, name: 'favorite-playlist.m3u', parentId: 3, type: 'file' },
  
  // Videos children
  { id: 38, name: 'Movies', parentId: 4, type: 'folder' },
  { id: 39, name: 'Tutorials', parentId: 4, type: 'folder' },
  { id: 40, name: 'Home Videos', parentId: 4, type: 'folder' },
  
  // Downloads children
  { id: 41, name: 'Software', parentId: 5, type: 'folder' },
  { id: 42, name: 'Documents', parentId: 5, type: 'folder' },
  { id: 43, name: 'installer.exe', parentId: 5, type: 'file' },
];

/**
 * Retrieves all folders from the API
 * @returns Promise<Folder[]> Array of all folders in the system
 * @throws Will fall back to mock data if API request fails
 */
export const getAllFolders = async (): Promise<Folder[]> => {
  try {
    const response = await api.get<Folder[]>("/folders");
    return response.data;
  } catch (error) {
    console.warn("API failed: /folders — using mock data", error);
    return mockFolders;
  }
};

/**
 * Retrieves direct children of a specific folder
 * @param id - The ID of the parent folder
 * @returns Promise<Folder[]> Array of folders that are direct children of the specified folder
 * @throws Will fall back to mock data if API request fails
 */
export const getChildren = async (id: number): Promise<Folder[]> => {
  try {
    const response = await api.get<Folder[]>(`/folders/${id}/children`);
    return response.data;
  } catch (error) {
    console.warn(
      `API failed: /folders/${id}/children — using mock data`,
      error
    );
    return mockFolders.filter(folder => folder.parentId === id);
  }
};
