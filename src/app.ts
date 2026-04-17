import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './app/routes'; 
import { globalErrorHandler } from './app/middlewares/error.middleware';


const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/v1', router)
;
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Urban Farming API is Running Smoothly!",
  });
});

// Error Handling Middleware
app.use(globalErrorHandler);

export default app;