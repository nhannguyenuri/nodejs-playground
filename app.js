import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import multer from 'multer';
import path from 'node:path';
import { V1Router } from './routes/v1/v1.js';
import { bootstrap as bootstrapLoggerService, Logger } from './services/logger/logger.js';
import { resJSON } from './utils/req/req.js';

const __dirname = path.resolve();

// Bootstrapping
await bootstrapLoggerService();

const app = express();

app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(multer().any());
app.use(express.json({ limit: '50mb' }));
app.use(express.raw({ limit: '50mb' }));
app.use(express.text({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API v1 routes
app.use('/api/v1', V1Router);

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
