import { TUser } from './user.interface';
import { UserModel } from './user.model';

// Create a User into DB Service
const createUserIntoDB = async (userInfo: TUser): Promise<TUser> => {
  const result = await UserModel.create(userInfo);
  return result;
};

// Get all Users from DB Service
const getAllUsers = async (): Promise<TUser[]> => {
  const result = await UserModel.find();
  return result;
};

// Get Single user from DB Service
const getSingleUser = async (userId: number): Promise<TUser | null> => {
  const result = await UserModel.findOne({ userId });
  if (result === null) {
    throw Error('User not found.');
  }
  return result;
};

// Update user service
const updateUser = async (
  userId: number,
  updateData: TUser,
): Promise<TUser | null> => {
  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $set: updateData },
    { new: true },
  );
  if (result === null) {
    throw Error();
  }
  return result;
};

// Delete a user service
const deleteUser = async (userId: number) => {
  const result = await UserModel.findOneAndUpdate({userId}, {isActive: false}, {new: false});
  if(result === null){
    throw Error()
  }
  // return result
  };

// All exported Service
export const UserService = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
};
