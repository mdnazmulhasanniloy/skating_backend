import z from 'zod';

const createSchema = z.object({
  body: z.object({
    followingId: z.string({ error: 'followingId is required.' }),
  }),
});

export const followersValidation = {
  createSchema,
};
