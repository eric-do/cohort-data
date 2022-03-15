import { Request, Response, NextFunction } from 'express';
import { DI } from '../app';
import { Cohort, Student } from '../entities';
import type { IStudent } from 'server/types';

export const addCohort = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { cohort: newCohort } = req.body;
    const cohort = DI.em.create(Cohort, newCohort)
    await DI.cohortRepository.persist(cohort).flush();
    res.status(201);
    res.locals.cohort = cohort;
    next();
  } catch (err) {
    next(err);
  }
};

export const getCohortById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code } = req.params;
    res.locals.cohort = await DI.em.findOneOrFail(
      Cohort,
      { code },
      { populate: ['students'] }
    );
    res.status(200);
    next();
  } catch (err) {
    next(err)
  }
}

export const getCohorts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query } = req;
  try {
    res.locals.cohorts = await DI.em.find(Cohort, query);
    res.status(200);
    next();
  } catch (err) {
    next(err)
  }
}

export const addStudentToCohort = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.params;
  const { student: { email } }: { student: IStudent} = req.body;
  try {
    const student = await DI.em.findOneOrFail(Student, { email });
    const cohort = await DI.em.findOneOrFail(Cohort, { code });
    cohort.students.add(student);
    await DI.em.persistAndFlush(cohort);
    res.locals.cohort = cohort;
    res.status(201);
    next();
  } catch (err) {
    next(err);
  }
}