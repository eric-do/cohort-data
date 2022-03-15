import { Request, Response, NextFunction } from 'express';
import { _formatErrorMessages, ZodError } from '@lib/zod';

export const logErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
  console.error(err);
  next(err);
}

export const inputErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
  if (err instanceof ZodError) {
    const errors = _formatErrorMessages(err);
    res.status(400).send({ errors });
  } else {
    next();
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
  res.status(400).send();
}