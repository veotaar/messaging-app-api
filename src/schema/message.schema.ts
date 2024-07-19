import { TypeOf, object, string, number } from 'zod';

export const getMessagesSchema = object({
  params: object({
    conversationId: string({
      required_error: 'conversation ID is required',
    }),
  }),
  query: object({
    page: number({
      required_error: 'page is required',
    }),
    limit: number({
      required_error: 'limit is required',
    }),
  })
});

export type GetMessagesInput = TypeOf<typeof getMessagesSchema>;