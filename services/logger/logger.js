import { createLogger, format, transports } from 'winston';

const Logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({
      silent: false,
    }),
  ],
});

const bootstrap = async () => {
  Logger.log('info', `Logger is ready to use`);
};

export { bootstrap, Logger };
