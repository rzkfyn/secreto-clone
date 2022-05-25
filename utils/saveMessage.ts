import { client, dbname } from './db';

export const saveMessage = (message: string, forUserSecretId: string, timeStamp: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        client.connect((err, client) => {
            if (err) return reject(err);
            const db = client?.db(dbname);

            db?.collection('messages').insertOne({
                text: message,
                forUserSecretId,
                timeStamp
            },
            (err, res) => {
                if (err) return reject(err);
                return res ? resolve(true) : resolve(false);
            });
        });
    });
}