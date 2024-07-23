import { Express, Request, Response } from 'express';
import validate from './middleware/validateSchema';
import requireAuth from './middleware/requireAuth';
import { createUserSchema, loginSchema, friendsSchema } from './schema/user.schema';
import { friendRequestSchema, deleteFriendRequestSchema } from './schema/friendRequest.schema';
import { createConversationSchema, createMessageSchema, conversationsSchema, getConversationSchema} from './schema/conversation.schema';
import { createUserHandler, loginHandler, listFriendsHandler } from './controllers/user.controller';
import { createFriendRequestHandler, deleteFriendRequestHandler, listFriendRequestsHandler, acceptFriendRequestHandler, rejectFriendRequestHandler } from './controllers/friendRequest.controller';
import { createConversationHandler, listConversationsHandler, sendMessageHandler, getConversationHandler } from './controllers/conversation.controller';
import { getMessagesSchema } from './schema/message.schema';
import { getMessagesHandler } from './controllers/message.controller';

const routes = (app: Express) => {
  app.get('/api/protected', requireAuth, (_req, res) => res.json({ msg: 'You are successfully authenticated!' }));
  app.get('/api/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.post('/api/users', validate(createUserSchema), createUserHandler);

  app.post('/api/login', validate(loginSchema), loginHandler)

  app.post('/api/friend-requests', validate(friendRequestSchema), requireAuth, createFriendRequestHandler);
  app.get('/api/friend-requests', requireAuth, listFriendRequestsHandler)
  app.delete('/api/friend-requests/:requestId', validate(deleteFriendRequestSchema), requireAuth, deleteFriendRequestHandler);

  app.put('/api/friend-requests/:requestId/accept', validate(deleteFriendRequestSchema), requireAuth, acceptFriendRequestHandler);
  app.delete('/api/friend-requests/:requestId/reject', validate(deleteFriendRequestSchema), requireAuth, rejectFriendRequestHandler);

  app.get('/api/users/:userId/friends', validate(friendsSchema), requireAuth, listFriendsHandler);

  app.post('/api/conversations/:initiatorId/:recipientId', validate(createConversationSchema), requireAuth, createConversationHandler);
  app.get('/api/users/:userId/conversations', validate(conversationsSchema), requireAuth, listConversationsHandler);

  app.put('/api/conversations/:conversationId', validate(createMessageSchema), requireAuth, sendMessageHandler);
  app.get('/api/conversations/:conversationId', validate(getConversationSchema), requireAuth, getConversationHandler);
  app.get('/api/conversations/:conversationId/messages', validate(getMessagesSchema), requireAuth, getMessagesHandler);
}

export default routes;