import 'dotenv/config';
import config from 'config';
import connect from './utils/connect';
import log from './utils/logger';
import useServer from './utils/server';

const port = config.get<number>('port');

const { server, io } = useServer();

io.on('connection', (socket) => {
  log.info('A user is connected!');

  socket.on('join', (userId: string) => {
    socket.join(userId);
    log.info(`User ${userId} joined room`);
  });

  socket.on('disconnect', () => {
    log.info(`User disconnected`);
  })
})

server.listen(port, async () => {
  log.info(`App is running at http://localhost:${port}`);
  await connect();
});
