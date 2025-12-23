import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/User";
import UserAPI from "../apis/UserApi";
import config from "../playwright.config";

export default class RegiserPage {
  private page: Page;
  private request?: APIRequestContext;
  private context?: BrowserContext;

  constructor(
    page: Page,
    request?: APIRequestContext,
    context?: BrowserContext
  ) {
    this.page = page;
    this.request = request;
    this.context = context;
  }
  private get firstNameInput() {
    return '[data-testid="first-name"]';
  }
  private get lastNameInput() {
    return '[data-testid="last-name"]';
  }
  private get emailNameInput() {
    return '[data-testid="email"]';
  }

  private get passwordInput() {
    return '[data-testid="password"]';
  }
  private get confirmpasswordInput() {
    return '[data-testid="confirm-password"]';
  }
  private get submitButton() {
    return '[data-testid="submit"]';
  }
  async load() {
    await this.page.goto("/signup");
  }
  async register(user: User) {
    await this.page.type(this.firstNameInput, user.getFirstname());
    await this.page.type(this.lastNameInput, user.getlastname());
    await this.page.type(this.emailNameInput, user.getemail());
    await this.page.type(this.passwordInput, user.getpassword());
    await this.page.type(this.confirmpasswordInput, "Test1234");
    await this.page.click(this.submitButton);
  }

  async registerUsingAPI(user: User) {
    let response = await new UserAPI(this.request!).register(user);
    let responseBody = await response.json();
    let accessToken = responseBody.access_token;
    let userID = responseBody.userID;
    let firstName = responseBody.firstName;

    user.setaccessToken(accessToken);

    await this.context!.addCookies([
      {
        name: "access_token",
        value: accessToken,
        url: config.use?.baseURL,
      },
      {
        name: "firstName",
        value: firstName,
        url: config.use?.baseURL,
      },
      {
        name: "userID",
        value: userID,
        url: config.use?.baseURL,
      },
    ]);
  }
}
