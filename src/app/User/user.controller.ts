import { Request, Response } from "express";
import { UserService } from "./user.service";

// Create User Controller
const createUser = async (req: Request, res: Response) => {

    try {
        const userInfo = req.body;

        const result = await UserService.createUserIntoDB(userInfo);
        res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: result
        })

    } catch (error) {
        res.status(501).json({
            success: false,
            message: "User not created",
            error: error
        })
    }

};

// Get all users controller.
const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Users not found",
            error: {
                code: 404,
                description: "Users not found!"
            }
        })
    }
};

// Get single user Controller
const getSingleUser = async (req: Request, res: Response) => {

    try {
        const userId = parseInt(req.params.userId);
        const result = await UserService.getSingleUser(userId);
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
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
            message: "User updated successfully!",
            data: result
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found"
            }
        })
    }
}



export const UserController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser
};
