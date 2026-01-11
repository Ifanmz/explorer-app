import { test, expect, describe } from "bun:test";
import { mockApp } from "./mock.app";

describe("App Endpoints", () => {
  test("GET / should return backend status", async () => {
    const response = await mockApp.handle(new Request("http://localhost/"));
    const text = await response.text();
    
    expect(response.status).toBe(200);
    expect(text).toBe("Backend is running");
  });

  test("GET /health should return ok status", async () => {
    const response = await mockApp.handle(new Request("http://localhost/health"));
    const json = await response.json();
    
    expect(response.status).toBe(200);
    expect(json.status).toBe("ok");
  });

  test("GET /folders should return folders array", async () => {
    const response = await mockApp.handle(new Request("http://localhost/folders"));
    const json = await response.json();
    
    expect(response.status).toBe(200);
    expect(Array.isArray(json)).toBe(true);
    expect(json.length).toBeGreaterThan(0);
  });

  test("GET /folders/:id/children should return children array", async () => {
    const response = await mockApp.handle(new Request("http://localhost/folders/1/children"));
    const json = await response.json();
    
    expect(response.status).toBe(200);
    expect(Array.isArray(json)).toBe(true);
  });
});