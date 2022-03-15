import { z } from '@lib/zod';

export const Student = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});