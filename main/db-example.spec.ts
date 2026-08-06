import { test, expect } from "@playwright/test";
import {
  getUserByUsername,
  insertTestUser,
  deleteUser,
} from "../functions/db.functions";
import { closePool } from "../db/connection";

test.describe("Database connection examples", () => {

  test("SELECT: fetch a user directly from the DB", async () => {
    const user = await getUserByUsername("testuser");
    expect(user).toBeDefined();
    expect(user?.status).toBe("active");
  });

  test("INSERT + verify: create a user then confirm via UI", async ({ page }) => {
    // 1. Seed data directly in the DB
    const newUser = await insertTestUser("qa_temp_user", "qa_temp@example.com");
    expect(newUser.id).toBeGreaterThan(0);

    // 2. Use that data in a UI test
    await page.goto("https://example.com/admin/users");
    await page.fill("#search-input", newUser.username);
    await page.click("#search-button");
    await expect(page.locator(`text=${newUser.username}`)).toBeVisible();

    // 3. Clean up the test data
    await deleteUser(newUser.id);
  });

  test.afterAll(async () => {
    await closePool(); // release the connection pool when tests are done
  });
});
