import { ZodError } from 'zod';

export const _formatErrorMessages = (err: ZodError) => {
  return err.issues.map(issue => `${issue.message}: ${issue.path.join(', ')}`);
}

export * from 'zod';