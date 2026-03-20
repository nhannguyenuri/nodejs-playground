import express from 'express';
import { verifyToken } from '../../../middlewares/keycloak.js';
import { resJSON } from '../../../utils/req/req.js';
import { getHealth } from '../models/health.js';

const router = express.Router();

/**
 * @openapi
 * /health:
 *  get:
 *    description: Health API to check if server is online.
 *    tags:
 *      - Health
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
router.get('/', verifyToken, async (req, res) => {
  const result = await getHealth();

  if (result.error instanceof Error) {
    resJSON(req, res, 500, 'Internal Server Error');
  } else {
    resJSON(req, res, 200, result);
  }
});

export { router as HealthRouter };
