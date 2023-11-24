"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
exports.UsersRouter = express_1.default.Router();
exports.UsersRouter.put('/:userId', user_controller_1.UserController.updateUser);
exports.UsersRouter.put('/:userId/orders', user_controller_1.UserController.addToOrders);
exports.UsersRouter.post('/', user_controller_1.UserController.createUser);
exports.UsersRouter.delete('/:userId', user_controller_1.UserController.deleteUser);
exports.UsersRouter.get('/:userId', user_controller_1.UserController.getSingleUser);
exports.UsersRouter.get('/:userId/orders', user_controller_1.UserController.getUserOrders);
exports.UsersRouter.get('/:userId/orders/total-price', user_controller_1.UserController.calculateUserTotalOrderPrice);
exports.UsersRouter.get('/', user_controller_1.UserController.getAllUser);
