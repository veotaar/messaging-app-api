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

export const conversationsSchema = object({
  params: object({
    userId: string({
      required_error: 'user ID is required',
    }),
  })
});

export const createMessageSchema = object({
  params: object({
    conversationId: string({
      required_error: 'conversation ID is required',
    }),
  }),
  body: object({
    content: string({
      required_error: 'content is required',
    }),
  })
});

export type CreateConversationInput = TypeOf<typeof createConversationSchema>;
export type ConversationsInput = TypeOf<typeof conversationsSchema>;
export type CreateMessageInput = TypeOf<typeof createMessageSchema>;