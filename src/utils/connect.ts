import mongoose from 'mongoose';
import { ENV } from '../../env';
import log from './logger';


const writeConcern = new mongoose.mongo.WriteConcern('majority');

const connect = async () => {
  const dbString = ENV.DB_ATLAS;

  try {
    await mongoose.connect(dbString, {
      dbName: 'messaging-api',
      retryWrites: true,
      writeConcern: writeConcern,
    });
    log.info('Connected to DB');
  } catch (error) {
    log.error('could not connect to db');
    process.exit(1);
  }
}

export default connect;