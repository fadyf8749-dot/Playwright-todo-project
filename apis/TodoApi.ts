import { APIRequestContext } from "@playwright/test";
import User from "../models/User";

export default class TodoApi {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
  async addtodo(user: User) {
    return await this.request.post("/api/v1/tasks", {
      data: {
        isCompleted: false,
        item: "playwright",
      },
      headers: {
        authorization: `Bearer ${user.getaccessToken()}`,
      },
    });
  }
}
