import cors from 'cors';
import express, { Application, Request, Response } from 'express';

// Application
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());


// All client requests
app.get('/', (req: Request, res: Response) => {
  res.send("The awesome server is running...");
});

export default app;
