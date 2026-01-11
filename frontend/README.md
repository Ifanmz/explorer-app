# Explorer App Frontend

Vue.js frontend for file explorer application with hierarchical interface and search functionality.

## Tech Stack

- **Framework**: Vue 3 + TypeScript
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Package Manager**: Bun

## Setup

1. Install dependencies:
```bash
bun install
```

2. Setup environment variables:
```bash
cp .env.example .env
```

Edit `.env` file:
```
VITE_API_BASE_URL=http://localhost:3000
```

3. Run development server:
```bash
bun run dev
```

Application will run at `http://localhost:5173`

## Features

- **Hierarchical Folder Tree**: Navigate folders with expand/collapse functionality
- **Search**: Search folders by name
- **Dual Panel**: Tree view on left, contents on right
- **Responsive Design**: Adaptive layout
- **Type Safety**: Full TypeScript support

## Project Structure

```
src/
├── api/
│   └── folderApi.ts
├── components/
│   ├── FolderTree.vue
│   └── FolderChildren.vue
├── App.vue
├── main.ts
└── style.css
```

## Build

```bash
bun run build
```

## Preview Production Build

```bash
bun run preview
```