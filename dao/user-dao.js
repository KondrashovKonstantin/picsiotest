import {ObjectId} from "mongodb";
import client from "../db/initDb.js";

const users = client.db().collection('user');

export const UserDao = {
    retrieve: async (id) => {
        return users.findOne({_id: new ObjectId(id)});
    },
    retrieveByUsername: async (username) => {
        return users.findOne({username});
    },
    create: async (data) => {
        return users.insertOne(data);
    }
};