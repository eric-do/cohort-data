import { Request, Response, NextFunction } from 'express';
import { Staff, Student } from '../schemas';

export const validateStudentInput = async (
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
  const { student } = req.body;

  try {
    Student.parse(student);
    next();
  } catch (err) {
    next(err);
  }
}

export const validateStaffInput = async (
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
  const { staff } = req.body;

  try {
    Staff.parse(staff);
    next();
  } catch (err) {
    next(err);
  }
}