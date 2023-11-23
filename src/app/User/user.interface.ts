import { TOrder } from '../Orders/orders.interface';

// User Full Name type, for cleaner code. This type is used in <TUser> type.
export type TUserFullName = {
  firstName: string;
  lastName: string;
};

// Address type, for cleaner code. This type is used in <TUser> type.
export type TAdress = {
  street: string;
  city: string;
  country: string;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAdress;
  orders: TOrder[];
};
