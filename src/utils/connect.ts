import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

const connect = async () => {
  const dbString = config.get<string>('dbString');

  try {
    await mongoose.connect(dbString, {
      dbName: 'messaging-api',
    });
    log.info('Connected to DB');
  } catch (error) {
    log.error('could not connect to db');
    process.exit(1);
  }
}

export default connect;