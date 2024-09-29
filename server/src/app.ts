import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

import cookieParser from 'cookie-parser';
import fs from 'fs';

const baseURL = '/backend/api/v1';
const app: Application = express();

// create uploads directory while starting the application
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

//Upload File
if (!fs.existsSync('./uploads/categoryImg')) {
  fs.mkdirSync('./uploads/categoryImg');
}

if (!fs.existsSync('./uploads/subCategoryImg')) {
  fs.mkdirSync('./uploads/subCategoryImg');
}

if (!fs.existsSync('./uploads/productImg')) {
  fs.mkdirSync('./uploads/productImg');
}
if (!fs.existsSync('./uploads/testimonialImg')) {
  fs.mkdirSync('./uploads/testimonialImg');
}
if (!fs.existsSync('./uploads/blog-images')) {
  fs.mkdirSync('./uploads/blog-images');
}

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      'http://localhost:3004',
      'http://localhost:3005',
      'http://85.239.232.185:3000',
      'http://85.239.232.185:3001',
      'http://85.239.232.185:4000',
    ],
    credentials: true,
    // methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
);
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(baseURL, express.static('uploads'));

app.use(baseURL, routes);

//global error handler
app.use(globalErrorHandler);

//handle not found

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
