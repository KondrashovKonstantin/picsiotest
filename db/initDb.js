import {MongoClient} from 'mongodb';

const client = new MongoClient(process.env.MONGO_URL || 'mongodb://localhost:27017/picsio');

export default client;
