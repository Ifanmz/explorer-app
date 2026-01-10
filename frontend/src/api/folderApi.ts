// frontend/src/api/folderApi.ts
import axios from "axios";

/**
 * Represents a folder or file in the file system
 */
export interface Folder {
  id: string;
  name: string;
  parentid: string | null;
  type?: string;
}

/**
 * Axios instance configured for folder API requests
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 3000,
});

/**
 * Mock data fallback containing sample folder structure
 * Used when API requests fail or during development
 */
const mockFolders: Folder[] = [
  {"id":"1","name":"Root","parentid":null},
  {"id":"2","name":"Documents","parentid":"1"},
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
export const getChildren = async (id: string): Promise<Folder[]> => {
  try {
    const response = await api.get<Folder[]>(`/folders/${id}/children`);
    return response.data;
  } catch (error) {
    console.warn(
      `API failed: /folders/${id}/children — using mock data`,
      error
    );
    return mockFolders.filter(folder => folder.parentid === id);
  }
};
