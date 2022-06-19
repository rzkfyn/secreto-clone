import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

class DataBase {
  private uri: string;
  protected dbname: string;
  protected mongoClient: MongoClient;

  public constructor() {
    this.uri = process.env.MONGODBCON_STR as string;
    this.dbname = process.env.DB_NAME as string;
    this.mongoClient = new MongoClient(this.uri, { serverApi: ServerApiVersion.v1 });
  }
}

export default DataBase;
