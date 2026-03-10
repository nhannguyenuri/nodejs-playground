import { Pool } from 'pg';
import { Logger } from '../../utils/logger/logger.js';

const postgres = new Pool({
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: process.env.POSTGRES_PORT ?? 5432,
  database: process.env.POSTGRES_DB ?? 'mydb',
  user: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWD ?? 'mypassword',
});

const connect = async () => {
  postgres.on('connect', () => {
    Logger.log('info', 'PostgreSQL connected');
  });

  postgres.on('error', (err) => {
    Logger.log('error', err);
  });

  const client = await postgres.connect();
  
  // Test the connection by running a simple query
  const result = await client.query('SELECT NOW()');
  Logger.log('info', `PostgreSQL connection test successful: ${result.rows[0].now}`);
  
  client.release();
};

const bootstrap = async () => {
  await connect();
};

export { bootstrap, postgres };
