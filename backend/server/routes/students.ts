import Router from 'express-promise-router';
import { z } from 'zod';
import { validateStudentInput } from '../middleware';
import { addStudent } from '../controllers';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.post(
  '/',
  validateStudentInput,
  addStudent
);

export default router;