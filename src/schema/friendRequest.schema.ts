import { TypeOf, object, string } from 'zod';

export const friendRequestSchema = object({
  body: object({
    to: string({
      required_error: 'to field is required',
    }),
  })
});

export const deleteFriendRequestSchema = object({
  params: object({
    requestId: string({
      required_error: 'request ID is required',
    }),
  })
})

export type FriendRequestInput = TypeOf<typeof friendRequestSchema>;
export type DeleteFriendRequestInput = TypeOf<typeof deleteFriendRequestSchema>;

