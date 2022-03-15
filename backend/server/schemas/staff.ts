import { z } from '@lib/zod';
import { StaffRole } from '../entities';

export const Staff = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: z.nativeEnum(StaffRole)
});