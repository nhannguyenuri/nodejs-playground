import express from 'express';
import { Logger } from '../../../services/logger/logger.js';

const router = express.Router();

/**
 * @openapi
 * /ping:
 *  get:
 *    description: Ping API to check if server is online.
 *    tags:
 *      - Ping
 *    responses:
 *      200:
 *        description: Server is online and returns a server status object.
 *      400:
 *        description: Bad request.
 *      404:
 *        description: Not found.
 *      500:
 *        description: Internal Server Error.
 */
router.get('/', async (req, res) => {
  Logger.log('info', `[${req.ip}] ${req.method} ${req.originalUrl}`);

  res.status(200).json({
    success: true,
    data: 'pong',
  });
});

export { router as PingRouter };
