import type { Folder } from "../api/folderApi";

export const getFileIcon = (folder: Folder): string => {
  if (folder.type === 'folder') return '📁';
  
  const name = folder.name.toLowerCase();
  if (name.endsWith('.pdf') || name.endsWith('.docx')) return '📋';
  if (name.endsWith('.xlsx') || name.endsWith('.csv')) return '📊';
  if (name.endsWith('.jpg') || name.endsWith('.png')) return '🖼️';
  if (name.endsWith('.mp3') || name.endsWith('.wav')) return '🎵';
  if (name.endsWith('.mp4') || name.endsWith('.avi')) return '🎬';
  
  return '📄'; // default file icon
};