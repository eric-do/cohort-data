import { Request, Response, NextFunction } from 'express';
import { Cohort, Staff, Student } from '../schemas';

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

export const validateCohortInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cohort } = req.body;
  console.log({cohort})
  try {
    Cohort.parse(cohort);
    next();
  } catch (err) {
    next(err);
  }
}