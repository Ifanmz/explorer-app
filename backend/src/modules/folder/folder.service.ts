import { FolderRepository } from "./folder.repository";
import { Folder } from "./folder.types";

export class FolderService {
  constructor(private repo = new FolderRepository()) {}

  async getTree(): Promise<Folder[]> {
    return this.repo.findAll();
  }

  async getChildren(folderId: string): Promise<Folder[]> {
    return this.repo.findChildren(folderId);
  }
}
