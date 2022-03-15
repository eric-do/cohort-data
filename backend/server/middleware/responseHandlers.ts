import { Request, Response, NextFunction } from 'express';

export const sendResponse = (
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
  res.send(res.locals);
  next();
}