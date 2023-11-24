import { z } from 'zod';

// Define the schemas for the nested structures
const UserNameValidationSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  lastName: z.string({ required_error: 'Last name is required' }),
});

const AddressValidationSchema = z.object({
  street: z.string({ required_error: 'Street is required' }),
  city: z.string({ required_error: 'City is required' }),
  country: z.string({ required_error: 'Country is required' }),
});

export const OrderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

// Define the main user schema
export const UserValidationSchema = z.object({
  userId: z.number({ required_error: 'User ID is required' }),
  username: z.string({ required_error: 'Username is required' }),
  password: z.string({ required_error: 'Password is required' }),
  fullName: UserNameValidationSchema,
  age: z.number({ required_error: 'Age is required' }),
  email: z.string({ required_error: 'Email is required' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string({ required_error: 'Hobbies are required' })),
  address: AddressValidationSchema,
});
