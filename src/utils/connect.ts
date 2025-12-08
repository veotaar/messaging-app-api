import mongoose from 'mongoose';
import config from 'config';
import log from './logger';


const writeConcern = new mongoose.mongo.WriteConcern('majority');

const connect = async () => {
  const dbString = config.get<string>('dbAtlas');
  console.log(dbString)

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