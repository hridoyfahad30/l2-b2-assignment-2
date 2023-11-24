"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
// Create a User into DB Service
const createUserIntoDB = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = yield user_model_1.UserModel.create(userInfo);
    const result = yield user_model_1.UserModel.aggregate([
        { $match: { userId } },
        { $project: {
                _id: 0,
                password: 0,
                orders: 0,
                __v: 0
            } }
    ]);
    return result;
});
// Get all Users from DB Service
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.UserModel.aggregate([
        {
            $project: {
                _id: 0,
                username: 1,
                fullName: 1,
                age: 1,
                email: 1,
                address: 1,
            }
        }
    ]);
    return result;
});
// Get Single user from DB Service
const getSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId });
    if (result === null) {
        throw Error('User not found.');
    }
    return result;
});
// Update user service
const updateUser = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOneAndUpdate({ userId }, { $set: updateData }, { new: true });
    if (result === null) {
        throw Error();
    }
    return result;
});
// Delete a user service
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOneAndUpdate({ userId }, { isActive: false }, { new: false });
    if (result === null) {
        throw Error();
    }
    return result;
});
// Add new product in order service
const addToOrders = (userId, order) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.updateOne({ userId }, { $addToSet: { orders: order } });
    if (!result.matchedCount || !result.modifiedCount) {
        throw Error();
    }
});
// Retrieve all orders for a specific user service
const getUserOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.aggregate([
        { $match: { userId: { $eq: userId } } },
        {
            $project: {
                _id: 0,
                orders: {
                    $map: {
                        input: "$orders",
                        as: "order",
                        in: {
                            productName: "$$order.productName",
                            price: "$$order.price",
                            quantity: "$$order.quantity",
                        }
                    }
                }
            }
        }
    ]);
    if (result === null) {
        throw Error('User not found.');
    }
    return result;
});
// Calculate Total Price of Orders for a Specific User service
const calculateTotalPrice = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_model_1.UserModel.findOne({ userId });
    if (!userExist) {
        throw Error();
    }
    const result = yield user_model_1.UserModel.aggregate([
        { $match: { userId } },
        { $unwind: "$orders" },
        {
            $group: {
                _id: "$orders.price",
                totalPrice: { $sum: { $multiply: [
                            '$orders.quantity',
                            '$orders.price'
                        ] } }
            }
        },
        {
            $project: {
                _id: 0,
                totalPrice: 1
            }
        }
    ]);
    return result;
});
// All exported Service
exports.UserService = {
    createUserIntoDB,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addToOrders,
    getUserOrders,
    calculateTotalPrice
};
