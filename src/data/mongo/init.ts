import mongoose from "mongoose";

interface IConnectionOptions {
  mongoUrl: string;
  dbName: string;
}
export class MongoDatabase {
  static async connect(options: IConnectionOptions) {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName: dbName,
      });

      console.log("Mongo Connected");
    } catch (error) {
      console.log(`Connection error ${error}`);
      throw error;
    }
  }
}
