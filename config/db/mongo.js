import mongoose from 'mongoose';
import { Logger } from '../../utils/logger/logger.js';

const connect = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) throw new Error('MONGO_URI is missing');

  mongoose.connection.on('connected', () => {
    Logger.log('info', 'MongoDB connected');
  });

  mongoose.connection.on('error', (err) => {
    Logger.log('error', err);
  });

  await mongoose.connect(uri);
};

const bootstrap = async () => {
  await connect();
};

export { bootstrap, mongoose };
