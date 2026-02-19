import { ENV } from '../env';
import connect from './utils/connect';
import log from './utils/logger';
import useServer from './utils/server';

const port = ENV.PORT;

const { server, io } = useServer();

io.on('connection', (socket) => {
  log.info('A user is connected!');

  socket.on('joinChat', (chatId: string) => {
    socket.join(chatId);
    log.info("user joined chat" + chatId);
  });

  socket.on('sendMessage', (newMessage) => {
    io.in(newMessage.newMessage.conversation).emit("newMessage", newMessage);
  })

  socket.on('disconnect', () => {
    log.info(`User disconnected`);
  })
})

server.listen(port, async () => {
  log.info(`App is running at http://localhost:${port}`);
  await connect();
});
