import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { folderController } from "./modules/folder/folder.controller";

export const app = new Elysia()
  .use(cors({
    origin: [
    "http://localhost:5173",
    "https://explorer.app"
  ],
    methods: ["GET"]
  }))
  .get("/", () => "Backend is running")
  .get("/health", async () => ({ status: "ok" }))
  .use(folderController);
