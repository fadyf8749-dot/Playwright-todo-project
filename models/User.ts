import { faker } from "@faker-js/faker";

export default class User {
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;
  private accessToken: string;
  private userID: string;

  constructor() {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.email = faker.internet.email();
    this.password = "Test1234";
  }
  getFirstname() {
    return this.firstName;
  }
  getlastname() {
    return this.lastName;
  }
  getemail() {
    return this.email;
  }
  getpassword() {
    return this.password;
  }
  getaccessToken() {
    return this.accessToken;
  }
  setaccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }
}
