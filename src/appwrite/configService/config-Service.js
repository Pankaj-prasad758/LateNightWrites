import { Client, Databases, Storage, Query, ID } from "appwrite";
import config from "../../config/config";
export class DatabasesService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndPointURL)
      .setProject(config.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const creatPost = await this.databases.createDocument(
        config.appwriteDataBaseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      return creatPost;
    } catch (error) {
      console.log("App Write :: create Post :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const updatePost = await this.databases.updateDocument(
        config.appwriteDataBaseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
      return updatePost;
    } catch (error) {
      console.log("Appwrite :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDataBaseID,
        config.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDataBaseID,
        config.appwriteCollectionID,
        slug
      );
    } catch (error) {
      console.log("Appwrite :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDataBaseID,
        config.appwriteCollectionID,
        queries
      );
    } catch (error) {
      console.log("Appwrite :: getPosts :: error", error);
    }
  }

  // file upload Service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(
      config.appwriteBucketID,
      fileId
    )
  }
}

const databasesService = new DatabasesService();

export default databasesService;
