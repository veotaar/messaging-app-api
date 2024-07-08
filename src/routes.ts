import { Express, Request, Response } from 'express';
import validate from './middleware/validateSchema';
import { createUserSchema, loginSchema } from './schema/user.schema';
import { createUserHandler, loginHandler } from './controllers/user.controller';


const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.post('/api/users', validate(createUserSchema), createUserHandler);

  app.post('/login', validate(loginSchema), loginHandler)
}

export default routes;