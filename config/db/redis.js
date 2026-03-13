import IORedis from 'ioredis';
import { Logger } from '../../utils/logger/logger.js';

const { connection, bootstrap } = (() => {
  if (process.env.DISABLED_REDIS) {
    Logger.log('info', 'Redis is disabled');

    const connection = null;
    const bootstrap = async () => {
      return;
    };

    return { connection, bootstrap };
  } else {
    const connection = new IORedis({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT, maxRetriesPerRequest: null });
    const bootstrap = async () => {
      Logger.log('info', 'Redis is ready to use');
    };

    return { connection, bootstrap };
  }
})();

export { bootstrap, connection };
