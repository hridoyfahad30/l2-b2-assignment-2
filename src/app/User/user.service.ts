import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

// Create a User into DB Service
const createUserIntoDB = async (userInfo: TUser) : Promise<TUser> => {
    const result = await UserModel.create(userInfo);
    return result;
};

// Get all Users from DB Service
const getAllUsers = async () : Promise<TUser[]> => {
    const result = await UserModel.find();
    return result;
};

// Get Single user from DB Service
const getSingleUser = async (userId: number) : Promise<TUser | null> => {    
    const result = await UserModel.findOne({userId});
    if(result === null){
        throw Error('User not found.')
    }
    return result
}



// All exported Service
export const UserService = {
    createUserIntoDB,
    getAllUsers,
    getSingleUser
}