import { Request, Response } from 'express';

export const addStudent = async (req: Request, res: Response) => {
  try {
    res.status(201).send({ id: 'Hello world' });
  } catch (err) {
    res.status(400).send()
  }
};