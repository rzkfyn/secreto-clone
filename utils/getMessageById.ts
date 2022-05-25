import { ObjectId } from 'mongodb';
import { dbname, client } from './db';
import type Message from './types/Message';

export const getMessageById = (id: string): Promise<Message | undefined | null> => {
    return new Promise((resolve, reject) => {
        client.connect((err, client) => {
            if (err) return(err);

            const db = client?.db(dbname);

            db?.collection('messages').findOne({
                _id: new ObjectId(id)
            },
            (err, res) => {
                if (err) return reject(err);
                return resolve(res as Message);
            });
        })
    });
}