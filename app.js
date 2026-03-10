import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import multer from 'multer';
import path from 'node:path';
import { bootstrap as bootstrapBullMQ } from './config/bullmq/bullmq.js';
import { bootstrap as bootstrapMongo } from './config/db/mongo.js';
import { bootstrap as bootstrapPostgres } from './config/db/postgres.js';
import { bootstrap as bootstrapRedis } from './config/db/redis.js';
import { bootstrap as bootstrapKeycloakAdminClient } from './config/keycloak/keycloak.js';
import { cacheControlNoStore } from './middlewares/cache-control.js';
import { verifyToken } from './middlewares/keycloak.js';
import { V1Router } from './routes/v1/v1.js';
import { bootstrap as bootstrapLogger } from './utils/logger/logger.js';
import { resJSON } from './utils/req/req.js';

const __dirname = path.resolve();

// Bootstrapping
await bootstrapLogger();
await bootstrapMongo();
await bootstrapPostgres();
await bootstrapRedis();
await bootstrapBullMQ();
await bootstrapKeycloakAdminClient();

const app = express();

app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(multer().any());
app.use(express.json({ limit: process.env.REQ_MAX_BODY_SIZE ?? '50mb' }));
app.use(express.raw({ limit: process.env.REQ_MAX_BODY_SIZE ?? '50mb' }));
app.use(express.text({ limit: process.env.REQ_MAX_BODY_SIZE ?? '50mb' }));
app.use(express.urlencoded({ limit: process.env.REQ_MAX_BODY_SIZE ?? '50mb', extended: true }));
app.use(cacheControlNoStore);
app.use(
  rateLimit({
    windowMs: 1 * 69 * 1000, // 1 minute
    max: 1000, // Limit each IP to 1000 requests per `window` (here, per minute)
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API v1 routes
app.use('/api/v1', verifyToken, V1Router);

// Not found handler
app.use((req, res) => {
  resJSON(req, res, 404, { message: 'Not found' });
});

// Use helmet middleware after api-docs route
// Issue: https://github.com/scottie1984/swagger-ui-express/issues/212
app.use(helmet());
// Example CSP
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", "'unsafe-inline'"]
//   }
// }));

export default app;
