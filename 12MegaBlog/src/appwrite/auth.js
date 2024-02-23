import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client)
  }

  async createAccount ({email, password, name}) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if(userAccount) {
        // return userAccount
        // call another method
        //login kara denge
        return this.login({email, password});
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({email, password}) {
    console.log()
    try {
      return await this.account.createEmailSession(email, password)
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get()
    } catch (error) {
      console.log("Appwrite :: getCurrentUser :: error", error)
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions()
    } catch (error) {
      console.log("Appwrite :: logout :: error", error)
    }
  }



}

const authService = new AuthService();

export default authService

