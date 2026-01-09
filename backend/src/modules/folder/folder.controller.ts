import { Elysia } from "elysia";
import { FolderService } from "./folder.service";

export const folderController = new Elysia({ prefix: "/folders" })
  .get("/", async () => {
    const service = new FolderService();
    return service.getTree();
  })
  .get("/:id/children", async ({ params }) => {
    const service = new FolderService();
    return service.getChildren(params.id);
  });
