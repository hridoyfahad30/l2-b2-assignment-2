import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {

    try {
        const userInfo = req.body;

        const result = await UserService.createUserIntoDB(userInfo);
        res.status(201).json({
            "success": true,
            "message": "User created successfully!",
            "data": result
        })

    } catch (error) {
        res.status(501).json({
            "success": false,
            "message": "User not created",
            "error": error
        })
    }

};

export const UserController = {
    createUser
};
