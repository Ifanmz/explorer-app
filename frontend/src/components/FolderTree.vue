<script setup lang="ts">
import { ref, computed } from "vue";
import { type Folder } from "../api/folderApi";
import { getFileIcon } from "../utils/fileIcon";

const props = defineProps<{
  folders: Folder[];
  parentId: string | null;
  selectedId?: string | null;
}>();

const emit = defineEmits<{
  select: [id: string];
}>();

const expanded = ref<string[]>([]);

const toggle = (id: string) => {
  const index = expanded.value.indexOf(id);
  if (index > -1) {
    expanded.value.splice(index, 1);
  } else {
    expanded.value.push(id);
  }
};

const selectFolder = (id: string) => {
  emit('select', id);
};

const children = computed(() =>
  props.folders.filter(f => f.parentid === props.parentId)
);

const hasChildren = (id: string) => {
  return props.folders.some(f => f.parentid === id);
};
</script>

<template>
  <ul class="folder-tree">
    <li v-for="folder in children" :key="folder.id" class="folder-item">
      <div class="folder-row" :class="{ selected: selectedId === folder.id }">
        <span 
          class="expand-icon" 
          @click="toggle(folder.id)"
          v-if="hasChildren(folder.id)"
        >
          {{ expanded.includes(folder.id) ? '▼' : '▶' }}
        </span>
        <span class="expand-icon placeholder" v-else></span>
        
        <span class="folder-icon">{{ getFileIcon(folder) }}</span>
        <span class="folder-name" @click="selectFolder(folder.id)">
          {{ folder.name }}
        </span>
      </div>

      <FolderTree
        v-if="expanded.includes(folder.id)"
        :folders="folders"
        :parentId="folder.id"
        :selectedId="selectedId"
        @select="selectFolder"
        class="nested"
      />
    </li>
  </ul>
</template>

<style scoped>
.folder-tree {
  list-style: none;
  padding: 0;
  margin: 0;
}

.folder-item {
  margin: 0;
}

.folder-row {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  cursor: pointer;
  user-select: none;
  font-size: 13px;
}

.folder-row:hover {
  background: #e3f2fd;
}

.folder-row.selected {
  background: #1976d2;
  color: white;
}

.expand-icon {
  width: 16px;
  text-align: center;
  margin-right: 4px;
  font-size: 10px;
  cursor: pointer;
}

.expand-icon.placeholder {
  cursor: default;
}

.folder-icon {
  margin-right: 6px;
  font-size: 14px;
}

.folder-name {
  flex: 1;
}

.nested {
  margin-left: 20px;
}
</style>
