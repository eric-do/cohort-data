import express from 'express';
import http from 'http';
import { StudentsRouter, CohortsRouter } from './routes';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Cohort, Staff, Student } from './entities';
import * as Errors from './middleware/errorHandlers'

export const app = express()
const PORT = parseInt(process.env.PORT || '3000')

export const DI = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  staffRepository: EntityRepository<Staff>,
  studentRepository: EntityRepository<Student>,
  cohortRepository: EntityRepository<Cohort>,
};

export const init = (async () => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>();
  DI.em = DI.orm.em;
  DI.staffRepository = DI.orm.em.getRepository(Staff);
  DI.studentRepository = DI.orm.em.getRepository(Student);
  DI.cohortRepository = DI.orm.em.getRepository(Cohort);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));

  app.use('/api/students', StudentsRouter);
  app.use('/api/cohorts', CohortsRouter);
  app.use((req, res) => res.status(404).json({ message: 'No route found' }));
  app.use(Errors.logErrors);
  app.use(Errors.inputErrorHandler);
  app.use(Errors.errorHandler);

  DI.server = app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
})();