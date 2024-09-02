import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  status?: number;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;

  const message = statusCode === 500 ? 'Server internal error' : err.message;

  res.status(statusCode).json({
    status: statusCode,
    message: message,
  });

  next();
};

export default errorHandler;
