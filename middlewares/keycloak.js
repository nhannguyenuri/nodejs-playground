import { createRemoteJWKSet, jwtVerify } from 'jose';
import { Logger } from '../utils/logger/logger.js';

const issuer = `${process.env.KEYCLOAK_HOST}:${process.env.KEYCLOAK_PORT}/realms/${process.env.KEYCLOAK_REALM}`;
const JWKS = createRemoteJWKSet(new URL(`${issuer}/protocol/openid-connect/certs`));

const verifyToken = async (req, res, next) => {
  if (process.env.DISABLED_KEYCLOAK) {
    next();
    return;
  }

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      Logger.log('error', 'Missing access token');
      return res.status(401).json({ message: 'Missing access token' });
    }

    const token = authHeader.split(' ')[1];

    const { payload } = await jwtVerify(token, JWKS, {
      issuer,
      algorithms: ['RS256'],
    });

    // Optional additional validations
    if (payload.typ !== 'Bearer') {
      Logger.log('error', 'Unexpected token type', { typ: payload.typ });
      return res.status(401).json({ message: 'Invalid token type' });
    }

    // ensure correct client issued token
    if (payload.azp !== process.env.KEYCLOAK_REALM) {
      Logger.log('error', 'Token issued for wrong client', { azp: payload.azp });
      return res.status(403).json({ message: 'Invalid client' });
    }

    req.user = payload;

    Logger.log('info', 'JWT verification successful', { user: payload.sub });

    next();
  } catch (err) {
    Logger.log('error', 'JWT verification failed', { error: err.message });
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export { verifyToken };
