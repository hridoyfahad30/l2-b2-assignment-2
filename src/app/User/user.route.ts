import express from 'express';
import { UserController } from './user.controller';

export const UsersRouter = express.Router();

UsersRouter.put('/:userId', UserController.updateUser);
UsersRouter.put('/:userId/orders', UserController.addToOrders);
UsersRouter.post('/', UserController.createUser);
UsersRouter.delete('/:userId', UserController.deleteUser);
UsersRouter.get('/:userId', UserController.getSingleUser);
UsersRouter.get('/', UserController.getAllUser);
