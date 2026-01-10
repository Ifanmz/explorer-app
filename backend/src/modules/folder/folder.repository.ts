import { db } from "../../db";
import { Folder } from "./folder.types";

export class FolderRepository {
  async findAll(): Promise<Folder[]> {
    const result = await db.query(
      "SELECT id::text, name, parent_id::text AS parentid, type FROM folders ORDER BY id"
    );
    return result.rows;
  }

  async findChildren(parentId: string): Promise<Folder[]> {
    const result = await db.query(
      "SELECT id::text, name, parent_id::text AS parentid, type FROM folders WHERE parent_id = $1 ORDER BY id",
      [parentId]
    );
    return result.rows;
  }
}