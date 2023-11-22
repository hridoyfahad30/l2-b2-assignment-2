import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (userInfo: TUser) => {
    const result = await UserModel.create(userInfo);
    return result;
};

export const UserService = {
    createUserIntoDB
}