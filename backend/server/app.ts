import express from 'express';
import { StudentsRouter } from './routes';

const app = express();

app.use('/api/students', StudentsRouter);

export default app;