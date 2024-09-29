import { TypeOf, object, string } from 'zod';

export const getMessagesSchema = object({
  params: object({
    conversationId: string({
      required_error: 'conversation ID is required',
    }),
  }),
  query: object({
    page: string({
      required_error: 'page is required',
    }),
    // cursor: string().optional()
    // limit: string({
    //   required_error: 'limit is required',
    // }),
  })
});

export type GetMessagesInput = TypeOf<typeof getMessagesSchema>;