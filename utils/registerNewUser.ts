import { client, dbname } from './db';

// eslint-disable-next-line max-len
export const registerNewUser = async (name: string, secretId: string): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    client.connect((err, client) => {
      if (err) return reject(err);
      const db = client?.db(dbname);
      return db?.collection('users').insertOne(
        {
          name,
          secretId,
        },
        (err, res) => {
          console.log(res);
          if (err) return reject(err);
          return res ? resolve(`${res?.insertedId}`) : resolve(undefined);
        },
      );
    });
  });
};
