import { Request, Response, NextFunction } from 'express';
import { DI } from '../app';
import { Student } from '../entities';

export const addStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { student } = req.body;
    const response = DI.em.create(Student, student)
    res.status(201).send({ student: response });
  } catch (err) {
    res.status(400).send()
  }
};

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.locals.students = await DI.studentRepository.findAll();
    res.status(200);
    next();
  } catch (err) {
    console.error(err)
    next(err)
  }
}