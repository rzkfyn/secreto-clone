import { ObjectId } from 'mongodb';

type CommentType = {
  _id: ObjectId,
  forUserSecretId: string,
  forMessageId: string,
  text: string,
  sentAt: string,
};

export default CommentType;
