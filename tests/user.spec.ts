import { test, expect } from "@playwright/test";
import User from "../models/User";
import RegiserPage from "../pages/RegisterPage";
import TodoPage from "../pages/TodoPage";

test.describe("should be able to register to the todo website", () => {
  test("sign up test", async ({ page }) => {
    let user = new User();
    let regiserPage = new RegiserPage(page);
    await regiserPage.load();
    await regiserPage.register(user);
    let todoPage = new TodoPage(page);
    let welcomeMassege = todoPage.getWelcomeMassage();
    await expect(welcomeMassege).toBeVisible();
  });
});
