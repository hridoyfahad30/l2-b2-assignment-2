import { Request, Response } from 'express';
import { UserService } from './user.service';
import { OrderValidationSchema, UserValidationSchema } from './user.validation';

// Create A User Controller
const createUser = async (req: Request, res: Response) => {
  try {
    const userInfo = req.body;
    const zodParsedUserInfo = UserValidationSchema.parse(userInfo);

    const result = await UserService.createUserIntoDB(zodParsedUserInfo);
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result[0],
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: 'User not created',
      error: error,
    });
  }
};

// Get all users Controller.
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Users not found',
      error: {
        code: 404,
        description: 'Users not found!',
      },
    });
  }
};

// Get single user Controller
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await UserService.getSingleUser(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// Update user data Controller
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const updateData = req.body;
    const result = await UserService.updateUser(userId, updateData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

// Delete user Controller
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    await UserService.deleteUser(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

// Add new order in user data Controller
const addToOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const order = req.body;
    const zodParsedData = OrderValidationSchema.parse(order);

    await UserService.addToOrders(userId, zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found !',
      },
    });
  }
};

// Get user orders Controller
const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await UserService.getUserOrders(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// Calculate Total Price of Orders for a Specific User Controller
const calculateUserTotalOrderPrice = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await UserService.calculateTotalPrice(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addToOrders,
  getUserOrders,
  calculateUserTotalOrderPrice,
};
