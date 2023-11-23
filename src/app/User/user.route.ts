import express from 'express';
import { UserController } from './user.controller';


export const UsersRouter = express.Router();

UsersRouter.post('/', UserController.createUser);
UsersRouter.get('/', UserController.getAllUser);
UsersRouter.get('/:userId', UserController.getSingleUser)

