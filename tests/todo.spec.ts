import { test, expect } from "@playwright/test";
import User from "../models/User";
import RegiserPage from "../pages/RegisterPage";
import NewTodoPage from "../pages/NewTodoPage";
import TodoPage from "../pages/TodoPage";

test.describe("todo test", () => {
  test("should to be able to add a todo", async ({
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

  test("should to be able to add a new todo", async ({
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
