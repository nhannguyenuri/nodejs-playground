import express from 'express';
import { resJSON } from '../../../utils/req/req.js';
import { getPing } from '../models/ping.js';

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
  const result = await getPing();

  if (result.error instanceof Error) {
    resJSON(req, res, 500, 'Internal Server Error');
  } else {
    resJSON(req, res, 200, result);
  }
});

export { router as PingRouter };
