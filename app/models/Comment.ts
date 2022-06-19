import { WithId, Document } from 'mongodb';
import Model from '../core/Model.js';

class Comment extends Model {
  public constructor() {
    super('comments');
  }

  /**
   * @override
   */
  public findBySecretId(secretId: string): Promise<WithId<Document>[] | undefined> {
    return new Promise((resolve, reject) => {
      this.mongoClient.connect(async (err, client) => {
        if (err) return reject(err);
        const db = client?.db(this.dbname);
        const rawData = db?.collection(this.collection).find({ forUserSecretId: secretId });
        const data = await rawData?.toArray();
        return resolve(data);
      });
    });
  }
}

export default Comment;
