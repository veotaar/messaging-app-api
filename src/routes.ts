import { Express, Request, Response } from 'express';
import validate from './middleware/validateSchema';
import requireAuth from './middleware/requireAuth';
import { createUserSchema, loginSchema } from './schema/user.schema';
import { friendRequestSchema, deleteFriendRequestSchema } from './schema/friendRequest.schema';
import { createUserHandler, loginHandler } from './controllers/user.controller';
import { createFriendRequestHandler, deleteFriendRequestHandler, listFriendRequestsHandler, acceptFriendRequestHandler } from './controllers/friendRequest.controller';


const routes = (app: Express) => {
  app.get('/protected', requireAuth, (_req, res) => res.json({ msg: 'You are successfully authenticated!' }));
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.post('/api/users', validate(createUserSchema), createUserHandler);

  app.post('/login', validate(loginSchema), loginHandler)

  app.post('/api/friend-requests', validate(friendRequestSchema), requireAuth, createFriendRequestHandler);
  app.get('/api/friend-requests', requireAuth, listFriendRequestsHandler)
  app.delete('/api/friend-requests/:requestId', validate(deleteFriendRequestSchema), requireAuth, deleteFriendRequestHandler);

  app.put('/api/friend-requests/:requestId/accept', validate(deleteFriendRequestSchema), requireAuth, acceptFriendRequestHandler);
}

export default routes;