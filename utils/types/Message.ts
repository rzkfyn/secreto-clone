import { ObjectId } from 'mongodb';
import type Comment from './Comment';

type Message = {
    _id: ObjectId,
    text: string,
    timeStamp: string,
    forUserSecretId: string,
    comments? : Comment[];
}

export default Message;