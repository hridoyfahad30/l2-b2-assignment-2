export type TUserFullName = {
    firstName: string;
    lastName: string;
};

export type TAdress = {
    street: string;
    city: string;
    country: string;
};

export type TOrder = {
    productName: string;
    price: number;
    quantity: number
};

export type TUser = {
    userId: number;
    userName: string;
    password: string;
    fullName: TUserFullName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: TAdress;
    orders: TOrder[]
}