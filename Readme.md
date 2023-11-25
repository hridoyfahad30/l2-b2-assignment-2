# Node.js Express Application with TypeScript, MongoDB and Mongoose for User and Order Management

This guide provides instructions on how to use, set up, and run the Node.js Express application locally. The application uses TypeScript for programming and MongoDB with Mongoose for user data and order management. Data integrity is ensured through validation using Zod.

# API Endpoints
## User Management
### *1. Create a new user* 
### Endpoint: POST "/api/users"
If you hit this route using the POST method with the below data structure as the request body :

 

      {
          "userId": 1,
          "username": "john_doe",
          "password": "secure_password",
          "fullName": {
            "firstName": "John",
            "lastName": "Doe"
            },
          "age": 30,
          "email": "john@example.com",
          "isActive": true,
          "hobbies": ["reading", "swimming"],
          "address": {
            "street": "123 Main St",
            "city": "Cityville",
            "country": "US"
            }
        }

You will get Response like that :
Here you won't see the password as response, password field is projected from create user service. Also password will be hashed by Bcrypt using `.pre()` middleware before store in DB.

    {
      "success": true,
      "message": "User created successfully!",
      "data": {
        "userId": 1,
        "username": "john_doe",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "age": 30,
        "email": "john@example.com",
        "isActive": true,
        "hobbies": ["reading", "swimming"],
        "address": {
          "street": "123 Main St",
          "city": "Cityville",
          "country": "US"
        }
      }
    }


### *2. Retrieve a list of all users* 
### Endpoint: GET "/api/users"
If you hit this route using the GET method, You will get Response like bellow. Rest of the property of user is projected from aggregate pipeline. 

    {
        "success": true,
        "message": "Users fetched successfully!",
        "data": [
            {
                "username": "string",
                "fullName": {
                    "firstName": "string",
                    "lastName": "string"
                },
                "age": "number",
                "email": "string",
                "address": {
                    "street": "string",
                    "city": "string",
                    "country": "string"
                }
            },
            // more user will appear here according to your database data...
        ]
    }

### *3. Retrieve a specific user by userId* 
### Endpoint: GET "/api/users/:userId"
If you hit this route with "userId" using the GET method, You will get Response like that : 

    {
        "success": true,
        "message": "User fetched successfully!",
        "data": {
            "userId": "number",
            "username": "string",
            "fullName": {
                "firstName": "string",
                "lastName": "string"
            },
            "age": "number",
            "email": "string",
            "isActive": "boolean",
            "hobbies": ["string", "string"],
            "address": {
                "street": "string",
                "city": "string",
                "country": "string"
            }
        }
    }

### *4. Update user information* 
### Endpoint: PUT "/api/users/:userId"
Updated user data (similar structure as in user creation).
If you hit this route using the PUT method with the below data structure as the request body like bellow :

    {
      "userId": 1,
      "username": "john_doe_updated",
      "password": "new_secure_password",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "age": 31,
      "email": "john_updated@example.com",
      "isActive": true,
      "hobbies": ["reading", "swimming", "coding"],
      "address": {
        "street": "456 Oak St",
        "city": "Cityville",
        "country": "US"
      }
    }


You will get Response like that : 
   
  

     {
      "success": true,
      "message": "User updated successfully!",
      "data": {
        "userId": 1,
        "username": "john_doe_updated",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "age": 31,
        "email": "john_updated@example.com",
        "isActive": true,
        "hobbies": ["reading", "swimming", "coding"],
        "address": {
          "street": "456 Oak St",
          "city": "Cityville",
          "country": "US"
        }
      }
    }



### *5. Delete a user information* 
### Endpoint: DELETE "/api/users/:userId"

If you hit this route with the userId using the DELETE method, The user will not deleted permanently from DB, Actually it is an update method, it update the "isActive" property to false, while the operation is successfull you will notify with this response :

    {
        "success": true,
        "message": "User deleted successfully!",
        "data": null
    }


## Order Management
### *1. Add New Product in Order* 
### Endpoint: PUT "/api/users/:userId/orders"

If you hit this route using the PUT method with the below data structure as the request body like bellow :

    {
        "productName": "string",
        "price": "number",
        "quantity": "number"
    }

You will get response like bellow :

    {
        "success": true,
        "message": "Order created successfully!",
        "data": null
    }

### *2. Retrieve all orders for a specific user* 
### Endpoint: GET "/api/users/:userId/orders"

If you hit this route with "userId" using the GET method, You will get Response like that : 

    {
        "success": true,
        "message": "Order fetched successfully!",
        "data": {
            "orders": [
                {
                    "productName": "Product 1",
                    "price": 23.56,
                    "quantity": 2
                },
                {
                    "productName": "Product 2",
                    "price": 23.56,
                    "quantity": 5
                }
                // more orders...
            ]
        }
    }


### *3. Calculate Total Price of Orders for a Specific User* 
### Endpoint: GET  "/api/users/:userId/orders/total-price"

If you hit this route with "userId", the function will calculate automatically total price of all order against this user order, and you will get this response : 

    {
      "success": true,
      "message": "Total price calculated successfully!",
      "data": {
        "totalPrice": 1200
      }
    }


## Validation and Error Handling
#### Used Zod for validating incoming data for user and order creation and updating operations.

# How to use

## Prerequisites

-   Node.js installed on your machine. You can download it [here](https://nodejs.org/).
-   MongoDB Compass installed locally or a MongoDB Atlas account for a cloud-based solution. You can get MongoDB [here](https://www.mongodb.com/try/download/community).

## Getting Started

1.  **Clone the Repository**

      `git clone https://github.com/your-username/your-repo.git` 
    
2.  **Navigate to the Project Directory**
     
    `cd your-repo` 
    
3.  **Install Dependencies**
    
    `npm install` 
    
4.  **Set Up Environment Variables**
    
    Create a `.env` file in the root of your project and add the following:
    
    `MONGODB_URI=mongodb://localhost:27017/your-database-name
    
PORT=5000
BCRYPT_SALT_ROUNDS=16` 
    
    Adjust the MongoDB URI and port according to your setup.
    
5.  **Run the Application**
    
    `npm start` 
    
    Your application should now be running on `http://localhost:3000`.



## Data Models

### User and Order Data Model


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
    export const UserModel = model<TUser>('User', UserSchema);
