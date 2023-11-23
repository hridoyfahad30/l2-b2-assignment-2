import express from 'express';
import { UserController } from './user.controller';

export const UsersRouter = express.Router();

UsersRouter.put('/:userId', UserController.updateUser);
UsersRouter.post('/', UserController.createUser);
UsersRouter.get('/:userId', UserController.getSingleUser);
UsersRouter.get('/', UserController.getAllUser);
