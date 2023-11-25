import { TOrder, TUser } from './user.interface';
import { UserModel } from './user.model';

// Create a User into DB Service
const createUserIntoDB = async (userInfo: TUser) => {
  const { userId } = await UserModel.create(userInfo);
  const result = await UserModel.aggregate([

    // Stage 1: Match with specific userId
    { $match: { userId } },

    // Stage 2: Projected for which fields are exclude in response
    {
      $project: {
        _id: 0,
        password: 0,
        orders: 0,
        __v: 0,
      },
    },
  ]);
  return result;
};

// Get all Users from DB Service
const getAllUsers = async () => {
  const result = UserModel.aggregate([

    // Stage 1: Match the user who is active currently
    { $match: {isActive: {$ne: false}}},

    // Stage 2: Projected for which fields are include and exclude in response
    {
      $project: {
        _id: 0,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    }
  ]);
  if((await result).length === 0){
    throw Error()
  }
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

// Update user Service
const updateUser = async (
  userId: number,
  updateData: TUser,
): Promise<TUser | null> => {
  const result = await UserModel.findOneAndUpdate(
    { userId },
    updateData,
    { new: true },
  );
  if (result === null) {
    throw Error();
  }
  return result;
};

// Delete a user Service
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

// Add new order in user data Service
const addToOrders = async (userId: number, order: TOrder) => {
  const result = await UserModel.updateOne(
    { userId },
    { $addToSet: { orders: order } },
  );
  if (!result.matchedCount || !result.modifiedCount) {
    throw Error();
  }
};

// Retrieve all orders for a specific user Service
const getUserOrders = async (userId: number) => {
  const result = await UserModel.aggregate([
    { $match: {$and: [
      {isActive: {$ne: false}},
      {userId: { $eq: userId }}
    ]} },
    {
      $project: {
        _id: 0,
        orders: {
          $map: {
            input: '$orders',
            as: 'order',
            in: {
              productName: '$$order.productName',
              price: '$$order.price',
              quantity: '$$order.quantity',
            },
          },
        },
      },
    },
  ]);

  if (result === null || result.length === 0) {
    throw Error('User not found.');
  }
  return result;
};

// Calculate Total Price of Orders for a Specific User Service
const calculateTotalPrice = async (userId: number) => {
  const userExist = await UserModel.findOne({ userId });
  if (!userExist) {
    throw Error();
  }
  const result = await UserModel.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: '$orders.price',
        totalPrice: {
          $sum: { $multiply: ['$orders.quantity', '$orders.price'] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalPrice: 1,
      },
    },
  ]);
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
  getUserOrders,
  calculateTotalPrice,
};
