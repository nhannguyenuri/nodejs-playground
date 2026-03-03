import rateLimit from 'express-rate-limit';

const DEFAULT_TIME = 1 * 60 * 1000; // 1 minute
const DEFAULT_MAX_CONNECTIONS = 1000;

const rateLimitRequest = (time = DEFAULT_TIME, maxConnections = DEFAULT_MAX_CONNECTIONS) => {
  return rateLimit({
    windowMs: time,
    max: maxConnections,
    standardHeaders: true,
    legacyHeaders: false,
  });
};

export { rateLimitRequest };
