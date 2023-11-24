"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = exports.OrderValidationSchema = void 0;
const zod_1 = require("zod");
// Define the schemas for the nested structures
const UserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string({ required_error: 'First name is required' }),
    lastName: zod_1.z.string({ required_error: 'Last name is required' }),
});
const AddressValidationSchema = zod_1.z.object({
    street: zod_1.z.string({ required_error: 'Street is required' }),
    city: zod_1.z.string({ required_error: 'City is required' }),
    country: zod_1.z.string({ required_error: 'Country is required' }),
});
exports.OrderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
// Define the main user schema
exports.UserValidationSchema = zod_1.z.object({
    userId: zod_1.z.number({ required_error: 'User ID is required' }),
    username: zod_1.z.string({ required_error: 'Username is required' }),
    password: zod_1.z.string({ required_error: 'Password is required' }),
    fullName: UserNameValidationSchema,
    age: zod_1.z.number({ required_error: 'Age is required' }),
    email: zod_1.z.string({ required_error: 'Email is required' }),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string({ required_error: 'Hobbies are required' })),
    address: AddressValidationSchema,
});
