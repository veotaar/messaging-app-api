import express from 'express';
import routes from '../routes';
import cors from 'cors';
import { Server } from "socket.io";
import { createServer } from 'http';

const useServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  routes(app);

  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    }
  })

  return {
    server,
    io
  }
}

export default useServer;