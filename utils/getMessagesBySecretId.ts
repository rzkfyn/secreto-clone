import { WithId, Document } from 'mongodb';
import { dbname, client } from './db';

// eslint-disable-next-line max-len
export const getMessageBySecretId = async (secretId: string): Promise<WithId<Document>[] | undefined> => {
  return new Promise((resolve, reject) => {
    client.connect(async (err, client) => {
      if (err) return reject(err);

      const db = client?.db(dbname);
      const messages = await db?.collection('messages').find({
        forUserSecretId: secretId,
      }).toArray();

      return resolve(messages);
    });
  });
};
