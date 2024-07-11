import { TypeOf, object, string } from 'zod';

export const friendRequestSchema = object({
  body: object({
    to: string({
      required_error: 'to field is required',
    }),
  })
});

export const deletFriendRequestSchema = object({
  body: object({
    requestId: string({
      required_error: 'request ID is required',
    }),
  })
})

export type friendRequestInput = TypeOf<typeof friendRequestSchema>;
export type deleteFriendRequestInput = TypeOf<typeof deletFriendRequestSchema>;

