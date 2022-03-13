import { Request, Response } from 'express';
import { DI } from '../app';
import { Student } from '../entities';

export const addStudent = async (req: Request, res: Response) => {
  try {
    let { student } = req.body;
    const response = DI.em.create(Student, student)
    console.log(response)
    res.status(201).send({ student: response });
  } catch (err) {
    console.log({ err });
    res.status(400).send()
  }
};