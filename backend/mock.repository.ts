import { Folder } from "./src/modules/folder/folder.types";

export class MockFolderRepository {
  private mockData: Folder[] = [
    {"id":"1","name":"Root","parentid":null,"type":"folder"},
    {"id":"2","name":"Documents","parentid":"1","type":"folder"},
    {"id":"3","name":"Pictures","parentid":"1","type":"folder"},
    {"id":"4","name":"Music","parentid":"1","type":"folder"},
    {"id":"101","name":"Resume.pdf","parentid":"2","type":"file"}
  ];

  async findAll(): Promise<Folder[]> {
    return this.mockData;
  }

  async findChildren(parentId: string): Promise<Folder[]> {
    return this.mockData.filter(folder => folder.parentid === parentId);
  }
}