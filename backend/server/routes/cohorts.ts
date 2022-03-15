import Router from 'express-promise-router';
import { sendResponse, validateCohortInput } from '@middleware';
import {
  addCohort,
  getCohorts,
  getCohortById,
  addStudentToCohort
} from '../controllers';

const router = Router();

router.get(
  '/',
  getCohorts,
  sendResponse
);

router.get(
  '/:code',
  getCohortById,
  sendResponse
);

router.post(
  '/',
  validateCohortInput,
  addCohort,
  sendResponse
);

router.post(
  '/:code',
  addStudentToCohort,
  sendResponse
);

export default router;