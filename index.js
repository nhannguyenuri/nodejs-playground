import process from 'node:process';
import http from 'node:http';
import { Logger } from './services/logger/logger.js';
import { cleanUp } from './cleanup.js';
import app from './app.js';

const server = http.createServer(app);

// Register a listener for the 'listening' event to log when the server starts successfully
server.once('listening', () => {
  Logger.log('info', `Server listening at http://${process.env.HOST_NAME}:${process.env.PORT} in ${process.env.NODE_ENV} environment`);
});

// Start the server and listen on the specified host and port
server.listen({ port: process.env.PORT, hostname: process.env.HOST_NAME });

// Register listeners for various process events to handle graceful shutdown and cleanup
[('exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM')].forEach((eventType) => {
  process.on(eventType, (eventDetails) => {
    cleanUp.bind(null, eventType, eventDetails)();
  });
});
