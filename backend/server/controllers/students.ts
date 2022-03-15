import { Request, Response, NextFunction } from 'express';
import { DI } from '../app';
import { Student } from '../entities';

export const addStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
  try {
    let { student: newStudent } = req.body;
    const student = DI.em.create(Student, newStudent)
    await DI.studentRepository.persist(student).flush();
    res.status(201);
    res.locals.student = student;
    next();
  } catch (err) {
    next(err);
  }
};

export const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
  const { query } = req;
  try {
    res.locals.students = await DI.em.find(
      Student,
      query,
      { populate: ['cohorts'] }
    );
    res.status(200);
    next();
  } catch (err) {
    next(err)
  }
}