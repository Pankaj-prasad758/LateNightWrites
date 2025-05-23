
import { Client, Account, ID } from "appwrite";
import config from "../../config/config.js";

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

  async getCurrentUser() {
    try {
    return await this.account.get();
     
    } catch (error) {
      console.log("getCurrebtUser error", error);
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
