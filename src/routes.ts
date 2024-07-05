import { Express, Request, Response } from 'express';
import validate from './middleware/validateSchema';
import { createUserSchema } from './schema/user.schema';
import { createUserHandler } from './controllers/user.controller';


const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.post('/api/users', validate(createUserSchema), createUserHandler);

}

export default routes;