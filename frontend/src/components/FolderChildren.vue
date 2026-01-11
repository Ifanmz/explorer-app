<script setup lang="ts">
import { type Folder } from "../api/folderApi";
import { getFileIcon } from "../utils/fileIcon";

defineProps<{ folders: Folder[] }>();
</script>

<template>
  <div class="folder-children">
    <div v-if="folders.length === 0" class="empty-state">
      Select a folder to view its contents
    </div>
    <div v-else class="folder-grid">
      <div v-for="folder in folders" :key="folder.id" class="folder-card">
        <div class="folder-icon">{{ getFileIcon(folder) }}</div>
        <div class="folder-name">{{ folder.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.folder-children {
  padding: 16px;
}

.empty-state {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  margin-top: 50px;
}

.folder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
}

.folder-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.folder-card:hover {
  background: #f8f9fa;
  border-color: #dee2e6;
}

.folder-icon {
  font-size: 48px;
  margin-bottom: 8px;
}

.folder-name {
  font-size: 12px;
  text-align: center;
  word-break: break-word;
  color: #495057;
}
</style>
