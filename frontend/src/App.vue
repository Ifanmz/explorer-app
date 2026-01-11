<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getAllFolders, type Folder } from "./api/folderApi";
import FolderTree from "./components/FolderTree.vue";
import FolderChildren from "./components/FolderChildren.vue";
import { getFileIcon } from "./utils/fileIcon";

const allFolders = ref<Folder[]>([]);
const selectedChildren = ref<Folder[]>([]);
const selectedFolderId = ref<string | null>(null);
const searchQuery = ref("");
const isLoading = ref(true);

const filteredFolders = computed(() => {
  if (!searchQuery.value) return allFolders.value;
  return allFolders.value.filter(folder => 
    folder.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const isSearchMode = computed(() => !!searchQuery.value);

const selectFolder = (id: string) => {
  selectedFolderId.value = id;
  selectedChildren.value = allFolders.value.filter(folder => folder.parentid === id);
};

onMounted(async () => {
  try {
    const res = await getAllFolders();
    allFolders.value = res;
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="explorer">
    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>Loading folders...</p>
    </div>
    <template v-else>
    <div class="search-bar">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search folders..." 
        class="search-input"
      />
    </div>
    
    <div class="panels">
      <div class="left-panel">
        <h3>Folders</h3>
        <div v-if="isSearchMode" class="search-results">
          <div v-for="folder in filteredFolders" :key="folder.id" class="search-item" 
               :class="{ selected: selectedFolderId === folder.id }"
               @click="selectFolder(folder.id)">
            <span class="folder-icon">{{ getFileIcon(folder) }}</span>
            <span class="folder-name">{{ folder.name }}</span>
          </div>
        </div>
        <FolderTree
          v-else
          :folders="allFolders"
          :parentId="'1'"
          :selectedId="selectedFolderId"
          @select="selectFolder"
        />
      </div>

      <div class="right-panel">
        <h3>Contents</h3>
        <FolderChildren :folders="selectedChildren" />
      </div>
    </div>
    </template>
  </div>
</template>

<style scoped>
.explorer {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.search-bar {
  padding: 12px 16px;
  background: #f8f9fa;
  border-bottom: 1px solid #d0d0d0;
}

.search-input {
  width: 300px;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
}

.search-input:focus {
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}

.panels {
  display: flex;
  flex: 1;
}

.left-panel {
  width: 300px;
  border-right: 1px solid #d0d0d0;
  background: #f8f9fa;
  overflow-y: auto;
}

.right-panel {
  flex: 1;
  background: white;
  overflow-y: auto;
}

h3 {
  margin: 0;
  padding: 12px 16px;
  background: #e9ecef;
  border-bottom: 1px solid #d0d0d0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
}

.search-results {
  padding: 8px;
}

.search-item {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 13px;
}

.search-item:hover {
  background: #e3f2fd;
}

.search-item.selected {
  background: #1976d2;
  color: white;
}

.search-item .folder-icon {
  margin-right: 8px;
  font-size: 14px;
}

.search-item .folder-name {
  flex: 1;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #495057;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1976d2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
