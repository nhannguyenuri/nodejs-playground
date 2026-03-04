import { Logger } from '../../../utils/logger/logger.js';

const sampleProcessor = (job) => {
  Logger.log('info', 'Sample Processor: ' + JSON.stringify(job.data));
};

export { sampleProcessor };
