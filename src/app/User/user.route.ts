import express from 'express';
import { UserController } from './user.controller';

export const UsersRouter = express.Router();

// Create A User router
UsersRouter.post('/', UserController.createUser);

// Update user data Router
UsersRouter.put('/:userId', UserController.updateUser);

// Add new order in user data Router
UsersRouter.put('/:userId/orders', UserController.addToOrders);

// Get single user Router
UsersRouter.get('/:userId', UserController.getSingleUser);

// Get user orders Router
UsersRouter.get('/:userId/orders', UserController.getUserOrders);

// Calculate Total Price of Orders for a Specific User Router
UsersRouter.get(
  '/:userId/orders/total-price',
  UserController.calculateUserTotalOrderPrice,
);

// Get all users Router.
UsersRouter.get('/', UserController.getAllUser);

// Delete user Router
UsersRouter.delete('/:userId', UserController.deleteUser);
