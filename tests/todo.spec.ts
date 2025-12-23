import { test, expect } from "@playwright/test";
import User from "../models/User";
import RegiserPage from "../pages/RegisterPage";
import NewTodoPage from "../pages/NewTodoPage";
import TodoPage from "../pages/TodoPage";

test.describe("todo test", () => {
  test("sign in using API, and add todo, and make sure its added", async ({
    page,
    request,
    context,
  }) => {
    let user = new User();
    let regiserPage = new RegiserPage(page, request, context);
    await regiserPage.registerUsingAPI(user);
    let newTodoPage = new NewTodoPage(page);
    await newTodoPage.load();
    await newTodoPage.addNewTask("PlayWright");
    let todoPage = new TodoPage(page);
    let todotext = await todoPage.getTodoTextByIndex(0);
    expect(todotext).toEqual("PlayWright");

    // await page.locator('[data-testid="complete-task"]').nth(0).click();
    // let todoitems = page.locator('[data-testid="todo-item"]').nth(0);
    // await expect(todoitems).toHaveCSS("background-color", "rgb(33, 76, 97)");
  });

  test("sign in using API, and add a new todo using API, and delete it, and make sure its deleted", async ({
    page,
    request,
    context,
  }) => {
    let user = new User();
    let regiserPage = new RegiserPage(page, request, context);
    await regiserPage.registerUsingAPI(user);

    let newTodoPage = new NewTodoPage(page, request);
    await newTodoPage.addNewTaskUsingAPI(user);

    let todoPage = new TodoPage(page);
    await todoPage.load();
    await todoPage.deleteTodoByIndex(0);

    // await page.locator('[data-testid="complete-task"]').nth(0).click();
    let showmassege = todoPage.getWelcomeMassage();
    await expect(showmassege).toBeVisible();
  });
});
