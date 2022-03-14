import { Request, Response, NextFunction } from 'express';
import { _formatErrorMessages, ZodError } from '@lib/zod';

export const logErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  next(err);
}

export const inputErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).send({ errors: _formatErrorMessages(err) });
  } else {
    next();
  }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).send();
}