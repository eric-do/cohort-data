import express from 'express';
import http from 'http';
import { StudentsRouter } from './routes';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Cohort, Staff, Student } from './entities';

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

  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => res.json({ message: 'Welcome to MikroORM express TS example, try CRUD on /author and /book endpoints!' }));
  app.use('/api/students', StudentsRouter);
  app.use((req, res) => res.status(404).json({ message: 'No route found' }));

  DI.server = app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
})();