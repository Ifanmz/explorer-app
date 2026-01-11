import { test, expect, describe } from "bun:test";
import { FolderService } from "./src/modules/folder/folder.service";
import { MockFolderRepository } from "./mock.repository";

describe("FolderService", () => {
  test("should get all folders", async () => {
    const mockRepo = new MockFolderRepository();
    const service = new FolderService(mockRepo as any);
    const folders = await service.getTree();
    
    expect(folders).toBeDefined();
    expect(Array.isArray(folders)).toBe(true);
    expect(folders.length).toBeGreaterThan(0);
  });

  test("should get folder children", async () => {
    const mockRepo = new MockFolderRepository();
    const service = new FolderService(mockRepo as any);
    const children = await service.getChildren("1");
    
    expect(children).toBeDefined();
    expect(Array.isArray(children)).toBe(true);
    expect(children.every(child => child.parentid === "1")).toBe(true);
  });
});