import { Query, Schema, model } from 'mongoose';
import { TAdress, TOrder, TUser, TUserFullName } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

// User Name Schema for cleaner code. This Schema is used in <UserSchema>.
const UserNameSchema = new Schema<TUserFullName>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

// Address Schema for cleaner code. This Schema is used in <UserSchema>.
const AddressSchema = new Schema<TAdress>(
  {
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
  { _id: false },
);

// Order Schema
const OrderSchema = new Schema<TOrder>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

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
UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// User password is encrypted with bcrypt hash when update user.
UserSchema.pre('findOneAndUpdate', async function (this: any, next) {
  try {
    const update = this.getUpdate();
    if (update.password) {
      update.password = await bcrypt.hash(
        update.password,
        Number(config.bcrypt_salt_rounds),
      );
    }
  
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
  } catch (error) {
    next();
  }
});

// When hit "/api/users" route for Find All Users client will get data according bellow filter
UserSchema.pre(/^find/, function (this: Query<TUser, Document>, next) {
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


// This middleware will run when use Update One operation
UserSchema.pre(/^updateOne/, function (this: Query<TUser, Document>, next) {
  this.find({ isActive: { $ne: false } });
  next();
});

// User Model
export const UserModel = model<TUser>('User', UserSchema);
