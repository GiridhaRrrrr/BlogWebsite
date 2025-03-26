import config from "../../config/config";
import { Client, Databases, ID, Query } from "appwrite";

export class DatabaseServices{
    client = new Client();
    database;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId); 

        this.database = new Databases(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {

            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                },

            )
            
        } catch (error) {
            console.log("Appwrite service :: createPost :: Error" , error);        
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {

            return await this.database.updateDocument( 
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                },

            )
            
        } catch (error) {
            console.log("Appwrite service :: createPost :: Error" , error);        
        }
    }

    // delete
    async deletePost(slug){
        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )  
            return true;          
        } catch (error) {
            console.log("Appwrite service :: deletePost :: Error" , error);     
            return false;       
        }
    }
    // get single post
    async getPost(slug){
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )   
 
        } catch (error) {
            console.log("Appwrite service :: getPost :: Error" , error);
            return false;            
        }
    }
    // get query based post    
    async getAllPosts(queries = [Query.equal("status","active")]){//["active"] try to give in array also
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )            
        } catch (error) {
            console.log("Appwrite service :: getAllPosts :: Error" , error);
            return false;                           
        }
    } 



}

let databaseServices = new DatabaseServices();

export default databaseServices;
