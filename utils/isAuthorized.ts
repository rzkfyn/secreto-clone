import { getUserBySecretId } from "./getUserBySecretId";
import type User from './types/User';

export const isAuthorized = async (id: string, data: User): Promise<boolean> => {
    const user = await getUserBySecretId(id);

    if (!user) return false;
    const userId = typeof user._id == 'string' ? user._id : user._id.toString();
    const dataId = typeof data._id == 'string' ? data._id : data._id.toString();
    console.log(user, data);
    if ((userId == dataId) && (user.name == data.name) && (user.secretId == data.secretId)) return true;
    return false;
}