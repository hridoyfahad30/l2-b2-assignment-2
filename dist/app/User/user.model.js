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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
// User Name Schema for cleaner code. This Schema is used in <UserSchema>.
const UserNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
}, { _id: false });
// Address Schema for cleaner code. This Schema is used in <UserSchema>.
const AddressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
}, { _id: false });
// Order Schema
const OrderSchema = new mongoose_1.Schema({
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number },
});
// User Schema
const UserSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: UserNameSchema,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    hobbies: {
        type: [String],
        required: true,
    },
    address: {
        type: AddressSchema,
        required: true,
    },
    orders: {
        type: [OrderSchema],
    },
});
// User password is encrypted with bcrypt hash
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// When hit "/api/users" route for Find All Users client will get data according bellow filter
UserSchema.pre(/^find/, function (next) {
    this.find({ isActive: { $ne: false } }).projection({
        _id: 0,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
        orders: 1,
    });
    next();
});
// When hit "/api/users/:userId" route for Find A User client will get data according bellow filter
UserSchema.pre(/^findOne/, function (next) {
    this.find({}, { isActive: { $ne: false } }).projection({
        _id: 0,
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
    });
    next();
});
// When hit "/api/users/:userId" route for Update User client will get data according bellow filter
UserSchema.pre(/^findOneAndUpdate/, function (next) {
    this.find({ isActive: { $ne: false } }).projection({
        _id: 0,
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
    });
    next();
});
UserSchema.pre(/^updateOne/, function (next) {
    this.find({ isActive: { $ne: false } });
    next();
});
// User Model
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
