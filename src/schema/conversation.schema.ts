import { TypeOf, object, string } from 'zod';

export const createConversationSchema = object({
  params: object({
    initiatorId: string({
      required_error: 'initiator ID is required',
    }),
    recipientId: string({
      required_error: 'recipiant ID is required',
    }),
  })
});

export type CreateConversationInput = TypeOf<typeof createConversationSchema>;
