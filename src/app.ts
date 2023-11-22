import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UsersRouter } from './app/User/user.route';

// Application
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());


// All client requests for <User> management.
app.use('/api/users', UsersRouter)







app.get('/', (req: Request, res: Response) => {
  res.send("The awesome server is running...");
});

export default app;
