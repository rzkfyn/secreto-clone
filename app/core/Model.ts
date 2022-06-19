import {
  Document,
  ObjectId,
  OptionalId,
  WithId,
} from 'mongodb';
import DataBase from './DataBase.js';
import CommentType from '../types/CommentType.js';
import MessageType from '../types/MessageType.js';
import UserType from '../types/UserType.js';

class Model extends DataBase {
  protected collection: string;

  public constructor(collection: string) {
    super();
    this.collection = collection;
  }

  public all(): Promise<WithId<Document>[] | undefined> {
    return new Promise((resolve, reject) => {
      this.mongoClient.connect(async (err, client) => {
        if (err) return reject(err);
        const db = client?.db(this.dbname);
        const rawData = db?.collection(this.collection).find();
        const data = await rawData?.toArray();
        return resolve(data);
      });
    });
  }

  public find(id: string): Promise<WithId<Document> | undefined | null> {
    return new Promise((resolve, reject) => {
      this.mongoClient.connect((err, client) => {
        if (err) return reject(err);
        const db = client?.db(this.dbname);

        let _id: ObjectId;
        try {
          _id = new ObjectId(id);
        } catch (err) {
          return reject(err);
        }

        // eslint-disable-next-line function-paren-newline
        return db?.collection(this.collection).findOne({
          _id,
        },
        (err, data) => {
          if (err) return reject(err);
          if (!data) return reject(new Error('Data tidak ditemukan'));
          return resolve(data);
        // eslint-disable-next-line function-paren-newline
        });
      });
    });
  }

  public findBySecretId(secretId: string): Promise<WithId<Document>[] | undefined> {
    return new Promise((resolve, reject) => {
      this.mongoClient.connect(async (err, client) => {
        if (err) return reject(err);
        const db = client?.db(this.dbname);
        const rawData = db?.collection(this.collection).find({ secretId });
        const data = await rawData?.toArray();
        return resolve(data);
      });
    });
  }

  public findOneBySecretId(secretId: string): Promise<WithId<Document>> {
    return new Promise((resolve, reject) => {
      this.mongoClient.connect((err, client) => {
        if (err) return reject(err);
        const db = client?.db(this.dbname);

        // eslint-disable-next-line function-paren-newline
        return db?.collection(this.collection).findOne({
          secretId,
        },
        (err, res) => {
          if (err) return reject(err);
          if (!res) return reject(new Error('Data tidak ditemukan'));
          return resolve(res);
        // eslint-disable-next-line function-paren-newline
        });
      });
    });
  }

  public create(data: UserType | MessageType | CommentType): Promise<undefined | string> {
    return new Promise((resolve, reject) => {
      this.mongoClient.connect((err, client) => {
        if (err) return reject(err);
        const db = client?.db(this.dbname);

        // eslint-disable-next-line max-len
        return db?.collection(this.collection).insertOne(data as OptionalId<Document>, (err, res) => {
          if (err) return reject(err);
          return resolve(res?.insertedId?.toString());
        });
      });
    });
  }

  public delete(id: string): Promise<number | undefined> {
    return new Promise((resolve, reject) => {
      this.mongoClient.connect(async (err, client) => {
        const db = client?.db(this.dbname);

        let _id: ObjectId;
        try {
          _id = new ObjectId(id);
        } catch (err) {
          return reject(err);
        }

        // eslint-disable-next-line function-paren-newline
        return db?.collection(this.collection).deleteOne({
          _id,
        },
        (err, res) => {
          if (err) return reject(err);
          return resolve(res?.deletedCount);
        // eslint-disable-next-line function-paren-newline
        });
      });
    });
  }
}

export default Model;
