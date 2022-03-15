import Router from 'express-promise-router';
import { validateStudentInput } from '../middleware';
import { addStudent, getStudents } from '../controllers';
import { sendResponse } from '@middleware';

const router = Router();

router.get(
  '/',
  getStudents,
  sendResponse
);

router.post(
  '/',
  validateStudentInput,
  addStudent
);

export default router;