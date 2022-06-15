import { client, dbname } from './db';

// eslint-disable-next-line max-len
export const saveMessage = (message: string, forUserSecretId: string, timeStamp: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    client.connect((err, client) => {
      if (err) return reject(err);
      const db = client?.db(dbname);

      return db?.collection('messages').insertOne(
        {
          text: message,
          forUserSecretId,
          timeStamp,
        },
        (err, res) => {
          if (err) return reject(err);
          return res ? resolve(true) : resolve(false);
        },
      );
    });
  });
};
