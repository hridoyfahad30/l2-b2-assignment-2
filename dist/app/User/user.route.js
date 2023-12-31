"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
exports.UsersRouter = express_1.default.Router();
// Create A User router
exports.UsersRouter.post('/', user_controller_1.UserController.createUser);
// Update user data Router
exports.UsersRouter.put('/:userId', user_controller_1.UserController.updateUser);
// Add new order in user data Router
exports.UsersRouter.put('/:userId/orders', user_controller_1.UserController.addToOrders);
// Get single user Router
exports.UsersRouter.get('/:userId', user_controller_1.UserController.getSingleUser);
// Get user orders Router
exports.UsersRouter.get('/:userId/orders', user_controller_1.UserController.getUserOrders);
// Calculate Total Price of Orders for a Specific User Router
exports.UsersRouter.get('/:userId/orders/total-price', user_controller_1.UserController.calculateUserTotalOrderPrice);
// Get all users Router.
exports.UsersRouter.get('/', user_controller_1.UserController.getAllUser);
// Delete user Router
exports.UsersRouter.delete('/:userId', user_controller_1.UserController.deleteUser);
