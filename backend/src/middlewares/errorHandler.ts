import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong!' });
  res.status(404).json({ message: 'Путь запроса не найден, проверьте корректность URL' });
};
