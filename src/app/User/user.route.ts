import express from 'express';
import { UserController } from './user.controller';


export const UsersRouter = express.Router();

UsersRouter.post('/', UserController.createUser);
