import config from "../../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthServices{

    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId); 

        this.account = new Account(this.client);
        
    }

    async createAccount({email, password, userName}){
        try {
            
            const userAccount = await this.account.create(ID.unique(), email, password, userName);

            if(userAccount){
                // if registered we let him login
                return this.logIn({email, password});
            }
            else{
                return userAccount;
            }
            
        } catch (error) {
            throw error;            
        }

    }

    async logIn({email, password}){
        try {
            const session =  await this.account.createEmailPasswordSession(email, password);   
            return session;                 
        } catch (error) {
            throw error;            
        }
        // return null if you dont throw error then you can use it.
    }

    async getCurrentUser(){
        try {
            // Logged in
            return await this.account.get();
        } catch (error) {
            // Not logged in
            console.log("Appwrite service :: getCurrentUser :: Error" , error);
        }
        return null;
    }

    async logOut(){
        try {
            return await this.account.deleteSessions();            
        } catch (error) {
            console.log("Appwrite service :: Logout :: Error" , error);                       
        }
    }


}

let authServices = new AuthServices();

export default authServices;

