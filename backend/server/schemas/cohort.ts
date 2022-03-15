import { z } from '@lib/zod';

export const Cohort = z.object({
  code: z.string()
});