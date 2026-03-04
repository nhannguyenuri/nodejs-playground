import IORedis from 'ioredis';
import { Logger } from '../../utils/logger/logger.js';

const connection = new IORedis({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT, maxRetriesPerRequest: null });

const bootstrap = async () => {
  Logger.log('info', 'Redis is ready to use');
};

export { bootstrap, connection };
