import DBConnection from "../DBConnection";
import User from "../Model/User";
import { Collection, Db, MongoClient } from "mongodb"

let conn: MongoClient | undefined;
let database: Db | undefined;
let collection: Collection | undefined;
const collectionName: string = "Users";

init();

const UserDao = {
  /**
   * This function will return all the users in the database.
   */
  getAllUser: async function () {
    const result = collection?.find().toArray();
    return result;
  },

  createUser: async function (user: User) {
    const userInfo = {
      username: user.getUsername(),
      password: user.getPassword()
    }

    const result = collection?.insertOne(userInfo);
    return result;
  },

  deleteUser: async function (user: User) {
    const userInfo = {
      username: user.getUsername()
    }

    const result = collection?.deleteOne(userInfo);
    return result;
  },

  updateUser: async function (user: User) {
    const userInfo = {
      username: user.getUsername(),
      password: user.getPassword()
    }

    const result = collection?.updateOne(userInfo, userInfo);
    return result;
  }
}

async function init() {
  console.log("Initing connection in userDao");

  try {
    database = await DBConnection.getConnection();
    collection = database?.collection(collectionName);

    console.log(database?.databaseName);
    console.log(collection?.collectionName);

  } catch (err) {
    console.log(`Error in UserDao.init(): ${err}`);
  }
}
