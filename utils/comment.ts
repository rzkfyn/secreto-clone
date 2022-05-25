import { ObjectId } from 'mongodb';
import { dbname, client } from './db';
import { getMessageById } from './getMessageById';
import type Message from './types/Message';
import type Comment from './types/Comment';

export const comment = (messageId: string, text: string, timeStamp: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        client.connect( async (err, client) => {
            if (err) return reject(err);

            const db = client?.db(dbname);
            const comment: Comment = {
                forMessageId: new ObjectId(messageId),
                text: text,
                timeStamp
            };
            const message = await getMessageById(messageId) as Message;

            message.comments ? message.comments.push(comment) : void 0;
            const comments: Comment[] = message.comments || [comment];

            db?.collection('messages').updateOne({
                _id: new ObjectId(messageId)
            }, {
                $set: {
                    comments
                }
            },(err, res) => {
                if (err) return reject(err);
                return res ? resolve(true) : resolve(false);
            });
        });
    });
}