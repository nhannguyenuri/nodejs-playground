import express from 'express';
import fs from 'node:fs';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { serverAdapter as bullmqServerAdapter } from '../../config/bullmq/bullmq.js';
import { Logger } from '../../utils/logger/logger.js';
import { PingRouter } from './controllers/ping.js';

const swaggerJsdocOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeJS Playground API Documentation',
      version: '1.0.0',
      description: 'This is a RESTful API application made with Express.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://github.com/nhannguyendevjs/nodejs-playground/blob/master/LICENSE',
      },
      contact: {
        name: 'Nhan Nguyen',
        url: 'https://github.com/nhannguyendevjs',
      },
    },
    servers: [
      {
        url: `http://localhost:3000/api/v1`,
        description: '',
      },
    ],
  },
  apis: ['./routes/v1/controllers/*.js'],
};

const appRouter = express.Router();
const appRoutes = [];

// Ping routes
appRoutes.push({
  method: '',
  path: '/ping',
  router: PingRouter,
});

// BullMQ routes
appRoutes.push({
  method: '',
  path: '/admin/queues',
  router: bullmqServerAdapter.getRouter(),
});

// Swagger routes
appRoutes.push({
  method: '',
  path: '/api-docs',
  router: swaggerUi.serve,
});
appRoutes.push({
  method: 'GET',
  path: '/api-docs',
  router: swaggerUi.setup(swaggerJsdoc(swaggerJsdocOptions)),
});
Logger.info('Swagger UI available at /api/v1/api-docs/');

// Generate Swagger API documentation and save it to a JSON file
fs.writeFileSync('./docs/api-docs.json', JSON.stringify(swaggerJsdoc(swaggerJsdocOptions), null, 2));
Logger.info('Swagger API documentation generated at ./api-docs.json');

appRoutes.forEach((route) => {
  const { method, path, router } = route;

  switch (method) {
    case 'GET':
      appRouter.get(path, router);
      break;
    case 'POST':
      appRouter.post(path, router);
      break;
    case 'PUT':
      appRouter.put(path, router);
      break;
    case 'DELETE':
      appRouter.delete(path, router);
      break;
    case 'PATCH':
      appRouter.patch(path, router);
      break;
    default:
      appRouter.use(path, router);
      break;
  }
});

export { appRouter as V1Router };
