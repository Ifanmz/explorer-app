import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FolderChildren from './FolderChildren.vue'

describe('FolderChildren', () => {
  it('should render empty state when no folders', () => {
    const wrapper = mount(FolderChildren, {
      props: { folders: [] }
    })
    
    expect(wrapper.find('.empty-state').exists()).toBe(true)
    expect(wrapper.text()).toContain('Select a folder to view its contents')
  })

  it('should render folder grid when folders exist', () => {
    const folders = [
      { id: '1', name: 'Documents', parentid: null, type: 'folder' },
      { id: '2', name: 'Pictures', parentid: null, type: 'folder' }
    ]
    
    const wrapper = mount(FolderChildren, {
      props: { folders }
    })
    
    expect(wrapper.find('.folder-grid').exists()).toBe(true)
    expect(wrapper.findAll('.folder-card')).toHaveLength(2)
  })

  it('should display folder names correctly', () => {
    const folders = [
      { id: '1', name: 'Test Folder', parentid: null, type: 'folder' }
    ]
    
    const wrapper = mount(FolderChildren, {
      props: { folders }
    })
    
    expect(wrapper.text()).toContain('Test Folder')
  })
})