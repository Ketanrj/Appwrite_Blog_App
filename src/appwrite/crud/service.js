import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from '../../../connection/conf'

class Service {
    client = new Client()
    database;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.Endpoint)
        .setProject(conf.ProjectID)
        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, content, featured_image, status, userId}) {
        try {
            return await this.database.createDocument(
                conf.DatabaseID,
                conf.CollectionID,
                ID.unique(),
                {
                    title,
                    content,
                    featured_image,
                    status,
                    userId,
                }
            );
        } catch(error) {
            console.error('Create post error:', error);
            throw error;
        }
    }

    async updatePost(docID, {title, content, featured_image, status}){
        try {
            return await this.database.updateDocument(
                conf.DatabaseID,
                conf.CollectionID,
                docID,
                {
                    title,
                    content,
                    featured_image,
                    status
                }
            );
        } catch (error) {
            console.error('Update post error:', error);
            throw error;
        }
    }

    async deletePost(docID){
        try {
            await this.database.deleteDocument(
                conf.DatabaseID,
                conf.CollectionID,
                docID
            );
            return true;
        } catch (error) {
            console.error('Delete post error:', error);
            throw error;
        }
    }

    async getPost(docID){
        try {
            return await this.database.getDocument(
                conf.DatabaseID,
                conf.CollectionID,
                docID
            );
        } catch (error) {
            console.error('Get post error:', error);
            throw error;
        }
    }

    async getAllPosts(queries = []) {
        try {
            console.log("Fetching all posts");
            
            const response = await this.database.listDocuments(
                conf.DatabaseID,
                conf.CollectionID,
                []  // Empty array to get all documents without filtering
            );
            
            console.log("getAllPosts response:", response);
            return response;
        } catch (error) {
            console.error('Get all posts error:', error);
            throw error;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.BucketID,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error('Upload file error:', error);
            throw error;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.BucketID,
                fileId
            );
            return true;
        } catch (error) {
            console.error('Delete file error:', error);
            throw error;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.BucketID,
            fileId
        )
    }

    
    
}

const service = new Service();

export default service;