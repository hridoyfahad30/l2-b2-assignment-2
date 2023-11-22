import { Schema, model } from "mongoose";
import { TAdress, TUser, TUserFullName } from "./user.interface";


// User Name Schema for cleaner code. This Schema is used in <UserSchema>.
const UserNameSchema = new Schema<TUserFullName>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

// Address Schema for cleaner code. This Schema is used in <UserSchema>.
const AddressSchema = new Schema<TAdress>({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
})


// User Schema
const UserSchema = new Schema<TUser>({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }
    ,
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: UserNameSchema,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    hobbies: {
        type: [String],
        required: true
    },
    address: {
        type: AddressSchema,
        required: true
    },
});


// Model
export const UserModel = model<TUser>('User', UserSchema)
