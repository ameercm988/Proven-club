const { MongoClient } = require("mongodb");

const clusterName = "sample";
const dbName = "sample";

let localurl = `mongodb://localhost:27017/`;
const client = new MongoClient(localurl);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = connectToMongoDB;
