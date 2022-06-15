import { ObjectId } from 'mongodb';

type Comment = {
  text: string,
  forMessageId: ObjectId,
  timeStamp: string,
};

export default Comment;
