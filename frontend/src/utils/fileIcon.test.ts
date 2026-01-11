import { describe, it, expect } from 'vitest'
import { getFileIcon } from './fileIcon'

describe('getFileIcon', () => {
  it('should return folder icon for folder type', () => {
    const folder = { id: '1', name: 'Documents', parentid: null, type: 'folder' }
    expect(getFileIcon(folder)).toBe('📁')
  })

  it('should return document icon for PDF files', () => {
    const file = { id: '2', name: 'document.pdf', parentid: '1' }
    expect(getFileIcon(file)).toBe('📋')
  })

  it('should return document icon for DOCX files', () => {
    const file = { id: '3', name: 'report.docx', parentid: '1' }
    expect(getFileIcon(file)).toBe('📋')
  })

  it('should return spreadsheet icon for Excel files', () => {
    const file = { id: '4', name: 'data.xlsx', parentid: '1' }
    expect(getFileIcon(file)).toBe('📊')
  })

  it('should return spreadsheet icon for CSV files', () => {
    const file = { id: '5', name: 'data.csv', parentid: '1' }
    expect(getFileIcon(file)).toBe('📊')
  })

  it('should return image icon for JPG files', () => {
    const file = { id: '6', name: 'photo.jpg', parentid: '1' }
    expect(getFileIcon(file)).toBe('🖼️')
  })

  it('should return image icon for PNG files', () => {
    const file = { id: '7', name: 'image.png', parentid: '1' }
    expect(getFileIcon(file)).toBe('🖼️')
  })

  it('should return music icon for MP3 files', () => {
    const file = { id: '8', name: 'song.mp3', parentid: '1' }
    expect(getFileIcon(file)).toBe('🎵')
  })

  it('should return music icon for WAV files', () => {
    const file = { id: '9', name: 'audio.wav', parentid: '1' }
    expect(getFileIcon(file)).toBe('🎵')
  })

  it('should return video icon for MP4 files', () => {
    const file = { id: '10', name: 'movie.mp4', parentid: '1' }
    expect(getFileIcon(file)).toBe('🎬')
  })

  it('should return video icon for AVI files', () => {
    const file = { id: '11', name: 'video.avi', parentid: '1' }
    expect(getFileIcon(file)).toBe('🎬')
  })

  it('should return default file icon for unknown types', () => {
    const file = { id: '12', name: 'unknown.xyz', parentid: '1' }
    expect(getFileIcon(file)).toBe('📄')
  })

  it('should handle uppercase file extensions', () => {
    const file = { id: '13', name: 'DOCUMENT.PDF', parentid: '1' }
    expect(getFileIcon(file)).toBe('📋')
  })

  it('should handle mixed case file extensions', () => {
    const file = { id: '14', name: 'Image.JPG', parentid: '1' }
    expect(getFileIcon(file)).toBe('🖼️')
  })
})