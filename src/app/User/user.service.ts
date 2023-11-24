import { TOrder, TUser } from './user.interface';
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
  const result = await UserModel.findOneAndUpdate(
    { userId },
    { isActive: false },
    { new: false },
  );
  if (result === null) {
    throw Error();
  }
  return result;
};

// Add new product in order service
const addToOrders = async (userId: number, order: TOrder) => {
  const result = await UserModel.updateOne(
    { userId },
    { $addToSet: { orders: order } },
  );
  if (!result.matchedCount || !result.modifiedCount) {
    throw Error();
  }
};

// Retrieve all orders for a specific user service
const getUserOrders = async (userId: number) => {
  const result = await UserModel.aggregate([
    { $match: { userId: { $eq: userId } } },
    {
      $project: {
        _id: 0,
        orders: {
          $map: {
            input: "$orders",
            as: "order",
            in: {
              productName: "$$order.productName",
              price: "$$order.price",
              quantity: "$$order.quantity",
            }
          }
        }
      }
    }
  ])
  if (result === null) {
    throw Error('User not found.');
  }
  return result;
};

// All exported Service
export const UserService = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addToOrders,
  getUserOrders
};
