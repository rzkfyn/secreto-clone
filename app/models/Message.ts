import { WithId, Document } from 'mongodb';
import Model from '../core/Model.js';
import CommentType from '../types/CommentType.js';
import MessageType from '../types/MessageType.js';

class Message extends Model {
  public constructor() {
    super('messages');
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

  // eslint-disable-next-line class-methods-use-this
  public joinMessageWithComment(messages: MessageType[], comments: CommentType[]) {
    const res: any[] = [];
    messages.forEach((message) => {
      const messageComments: CommentType[] = [];
      comments.forEach((comment) => {
        if (message._id.toString() === comment.forMessageId) {
          messageComments.push(comment);
        }
      });
      res.push({
        ...message,
        comments: messageComments,
      });
    });

    return res;
  }
}

export default Message;
