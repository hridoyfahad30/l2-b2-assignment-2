import { Query, Schema, model } from 'mongoose';
import { TAdress, TUser, TUserFullName } from './user.interface';

// User Name Schema for cleaner code. This Schema is used in <UserSchema>.
const UserNameSchema = new Schema<TUserFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

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
});

// When hit "/api/users" route client will get data with bellow filter
UserSchema.pre(/^find/, function (this: Query<TUser, Document>, next) {
  this.find().projection({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  next();
});

// When hit "/api/users/:userId" route client will get data with bellow filter
UserSchema.pre(/^findOne/, function (this: Query<TUser, Document>, next) {
  this.find().projection({
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
    this.find().projection({
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

// Model
export const UserModel = model<TUser>('User', UserSchema);
