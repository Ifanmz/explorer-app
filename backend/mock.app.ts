import { Elysia } from "elysia";
import { MockFolderRepository } from "./mock.repository";
import { FolderService } from "./src/modules/folder/folder.service";

const mockRepo = new MockFolderRepository();

export const mockApp = new Elysia()
  .get("/", () => "Backend is running")
  .get("/health", async () => ({ status: "ok" }))
  .get("/folders", async () => {
    const service = new FolderService(mockRepo as any);
    return service.getTree();
  })
  .get("/folders/:id/children", async ({ params }) => {
    const service = new FolderService(mockRepo as any);
    return service.getChildren(params.id);
  });