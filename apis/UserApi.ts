import { APIRequestContext } from "@playwright/test";
import User from "../models/User";

export default class UserAPI {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
  async register(user: User) {
    return await this.request.post("/api/v1/users/register", {
      data: {
        email: user.getemail(),
        password: user.getpassword(),
        firstName: user.getFirstname(),
        lastName: user.getlastname(),
      },
    });
  }
}
