import { client, dbname } from './db';
import type User from './types/User';

export const getUserBySecretId = async (secretId: string): Promise<User | undefined | null> => {
  return new Promise((resolve, reject) => {
    client.connect((err, client) => {
      if (err) return reject(err);

      const db = client?.db(dbname);
      return db?.collection('users').findOne(
        {
          secretId,
        },
        (err, res) => {
          if (err) return reject(err);
          return resolve(res as User);
        },
      );
    });
  });
};
