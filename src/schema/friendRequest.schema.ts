import { TypeOf, object, string } from 'zod';

export const friendRequestSchema = object({
  body: object({
    to: string({
      required_error: 'to field is required',
    }),
  })
})

export type friendRequestInput = TypeOf<typeof friendRequestSchema>;
