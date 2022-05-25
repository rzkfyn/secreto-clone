import { ObjectId } from 'mongodb';

type User = {
    _id: ObjectId | string,
    name: string,
    secretId: string
};

export default User;