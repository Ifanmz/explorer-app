export interface Folder {
  id: string;
  name: string;
  parentid: string | null;
  type?: string;
}