import { db } from "../../db";
import { Folder } from "./folder.types";

export class FolderRepository {
  async findAll(): Promise<Folder[]> {
    // Mock data sesuai dengan struktur referensi
    const mockData: Folder[] = [
      {"id":"1","name":"Root","parentid":null},
      {"id":"2","name":"Documents","parentid":"1"},
      {"id":"3","name":"Pictures","parentid":"1"},
      {"id":"4","name":"Music","parentid":"1"},
      {"id":"5","name":"Work","parentid":"2"},
      {"id":"6","name":"Personal","parentid":"2"},
      {"id":"7","name":"Vacations","parentid":"3"},
      {"id":"8","name":"Family","parentid":"3"},
      {"id":"101","name":"Resume.pdf","parentid":"2"},
      {"id":"102","name":"Project.docx","parentid":"5"},
      {"id":"103","name":"Budget.xlsx","parentid":"6"},
      {"id":"104","name":"Beach.png","parentid":"7"},
      {"id":"105","name":"Family.jpg","parentid":"8"},
      {"id":"106","name":"Song.mp3","parentid":"4"}
    ];
    return mockData;
  }

  async findChildren(parentId: string): Promise<Folder[]> {
    const allFolders = await this.findAll();
    return allFolders.filter(folder => folder.parentid === parentId);
  }
}
