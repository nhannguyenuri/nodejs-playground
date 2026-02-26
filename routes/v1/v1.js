import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { PingRouter } from './ping/ping-ctrl.js';

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
  apis: ['./routes/v1/ping/*-ctrl.js'],
};

const appRouter = express.Router();
const appRoutes = [];

// Ping routes
appRoutes.push({
  method: '',
  path: '/ping',
  router: PingRouter,
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
