import { Page } from "@playwright/test";

export default class TodoPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get welcomeMassege() {
    return '[data-testid="welcome"]';
  }

  private get todoItem() {
    return '[data-testid="todo-item"]';
  }
  private get deleteItem() {
    return '[data-testid="delete"]';
  }
  private get noTodosMassege() {
    return '[data-testid="no-todos"]';
  }
  async load() {
    await this.page.goto("/todo");
  }
  getWelcomeMassage() {
    return this.page.locator('[data-testid="welcome"]');
  }
  async getTodoTextByIndex(index: number) {
    return await this.page.locator(this.todoItem).nth(index).innerText();
  }
  async deleteTodoByIndex(index: number) {
    await this.page.locator(this.deleteItem).nth(index).click();
  }
  getNoTodosMassege() {
    return this.page.locator(this.noTodosMassege);
  }
}
