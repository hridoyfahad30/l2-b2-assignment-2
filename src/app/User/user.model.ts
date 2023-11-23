import { Query, Schema, model } from 'mongoose';
import { TAdress, TUser, TUserFullName } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

// User Name Schema for cleaner code. This Schema is used in <UserSchema>.
const UserNameSchema = new Schema<TUserFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  }
},
  { _id: false }
);

// Address Schema for cleaner code. This Schema is used in <UserSchema>.
const AddressSchema = new Schema<TAdress>({
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
},
  { _id: false });

// User Schema
const UserSchema = new Schema<TUser>({
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
    required: true
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
});

// User password in encrypted with bcrypt
UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  )
  next();
});

// When hit "/api/users" route for Find All Users client will get data with bellow filter
UserSchema.pre(/^find/, function (this: Query<TUser, Document>, next) {
  this.find({ isActive: { $ne: false } }).projection({
    _id: 0,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  next();
});

// When hit "/api/users/:userId" route for Find A User client will get data with bellow filter
UserSchema.pre(/^findOne/, function (this: Query<TUser, Document>, next) {
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

// When hit "/api/users/:userId" route for Update User client will get data with bellow filter
UserSchema.pre(
  /^findOneAndUpdate/,
  function (this: Query<TUser, Document>, next) {
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
  },
);

UserSchema.pre(
  /^updateOne/,
  function (this: Query<TUser, Document>, next) {
    this.find({ isActive: { $ne: false } });
    next();
  },
);

// Model
export const UserModel = model<TUser>('User', UserSchema);
