import express from 'express';
import routes from '../routes';
import cors from 'cors';

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  routes(app);

  return app;
}

export default createServer;