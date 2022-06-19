import { ObjectId } from 'mongodb';

type MessageType = {
  _id: ObjectId,
  forUserSecretId: string,
  text: string,
  sentAt: string,
};

export default MessageType;
