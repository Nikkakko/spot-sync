import * as z from 'zod';

export const userQuery = z.object({
  artistName: z.string().min(1),
});

export type UserQuery = z.infer<typeof userQuery>;
