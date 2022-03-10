import express from 'express';
import { StudentsRouter } from './routes';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const app = express()
const PORT = 3000;

export const DI = {} as {
  orm: MikroORM,
  em: EntityManager
};

const bootstrap = async () => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>();
  console.log(DI.orm.em);
  DI.em = DI.orm.em;

  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  app.get('/', (req, res) => res.json({ message: 'Welcome to MikroORM express TS example, try CRUD on /author and /book endpoints!' }));
  app.use('/api/students', StudentsRouter);
  app.use((req, res) => res.status(404).json({ message: 'No route found' }));
  app.listen(PORT, () => {
    console.log(`MikroORM express TS example started at http://localhost:${PORT}`);
  });
  return { app, DI }
}

export default bootstrap;