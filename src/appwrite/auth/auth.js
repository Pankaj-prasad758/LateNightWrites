import config from "../../config/config.js";
import { Client, Account, ID } from "appwrite";

// Reuseable Auth service code
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndPointURL)
      .setProject(config.appwriteProjectID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const userLogin = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return userLogin;
    } catch (error) {
      throw error;
    }
  }
  
  // async createSession({}) {

  // }

  async getCurrentUser() {
    try {
      const user = await this.account
        .get()
        .then((user) => console.log("Connected: ", user))
        .catch((err) => console.log("Connection Error: ", err));
      return user;
    } catch (error) {
      console.log("getCurretUser :: testing....!!!!!  error", error);
    }

    return null;
  }

  async logout() {
    try {
      const userLogout = await this.account.deleteSessions();
      return userLogout;
    } catch (error) {
      console.log("userLogout error");
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
