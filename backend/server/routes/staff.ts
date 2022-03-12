import Router from 'express-promise-router';
import { z } from "zod";
import { StaffRole } from '../entities';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.post('/', (req, res) => {
  const { staff } = req.body;
  const Staff = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    role: z.nativeEnum(StaffRole)
  });

  try {
    Staff.parse(staff);
  } catch (err) {

  }
  res.status(201).send('Hello world');
});

export default router;