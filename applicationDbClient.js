require('dotenv').config();
var MongoClient = require('mongodb').MongoClient;
var url = process.env.URL_STR;

// const connectToMongoClient = async ()=> {
//     await MongoClient.connect(url);
// }

let client;
let db;

async function connectToMongoClient() {
  if (!client) {
    try {
      client = new MongoClient(url);
      await client.connect();
      console.log('Connected to MongoDB');
      db = client.db('exclusive'); // Replace with your database name
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
      throw err;
    }
  }
  return db;
}






module.exports = connectToMongoClient;