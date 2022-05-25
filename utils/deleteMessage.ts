import { ObjectId } from 'mongodb';
import { client, dbname } from './db';

export const deleteMessage = async (messageId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        client.connect((err, client) => {
            if (err) return reject(err);
            
            const db = client?.db(dbname);
            db?.collection('messages').deleteOne({
                _id: new ObjectId(messageId)
            },
            (err) => {
                if(err) return reject(err);
                return resolve(true);
            });
        })
    });
}