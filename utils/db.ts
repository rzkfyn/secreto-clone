import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

const uri = process.env.MONGODBCON_STR as string;
export const dbname = process.env.DB_NAME as string;
export const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
