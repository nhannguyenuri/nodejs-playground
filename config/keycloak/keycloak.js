import KcAdminClient from '@keycloak/keycloak-admin-client';
import { Logger } from '../../utils/logger/logger.js';

const kcAdminClient = new KcAdminClient({
  baseUrl: `${process.env.KEYCLOAK_HOST}:${process.env.KEYCLOAK_PORT}`,
  realmName: process.env.KEYCLOAK_REALM,
});

const bootstrap = async () => {
  try {
    await kcAdminClient.auth({
      username: process.env.KEYCLOAK_ADMIN_USERNAME,
      password: process.env.KEYCLOAK_ADMIN_PASSWD,
      grantType: 'password',
      clientId: 'admin-cli',
    });
    Logger.log('info', 'Keycloak admin client authenticated successfully');
  } catch (error) {
    Logger.log('error', `Failed to authenticate Keycloak admin client: ${error.message}`);
  }
};

export { bootstrap, kcAdminClient };
