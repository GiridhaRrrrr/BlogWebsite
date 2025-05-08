import config from "../../config/config";
import { Client, Storage, ID } from "appwrite";

export class StorageService{
    client = new Client();
    storage;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId); 

        this.storage = new Storage(this.client);
    }

    async uploadFile(file){// here file is not file name its blob [Binary Large Object] ie the actual file:
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            )  // return we get file id that id is the featured image that we send to databases                      
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: Error" , error);   
            return false;            
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: Error" , error);   
            return false;            
        }
    }

    async getFilePreview(fileId){
        try {
             // this method do not use await as its not uses database resources still we write it
            let url =  this.storage.getFileView(
                config.appwriteBucketId,
                fileId,
            )
            return url;
            
        } catch (error) {
            console.log("Appwrite service :: filepreview :: Error" , error);   
            return false;            
        }
    }
}

let storageService = new StorageService();

export default storageService;