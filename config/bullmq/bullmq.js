import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Queue, QueueEvents, Worker } from 'bullmq';
import { Logger } from '../../utils/logger/logger.js';
import { connection } from '../db/redis.js';
import { sampleEvent } from './events/sample.js';
import { sampleProcessor } from './processors/sample.js';

const appQueue = new Queue('My Queue', { connection });

const serverAdapter = new ExpressAdapter();

const addJobs = async (jobs = []) => {
  if (jobs.length > 0) {
    for (const job of jobs) {
      const { name, data, opts } = job;
      await appQueue.add(name, data, opts);
    }
  }
};

new Worker(
  'My Queue',
  async (job) => {
    switch (job.name) {
      case 'initial':
        Logger.log('info', job.data.message);
        break;
      case 'sample-processor':
        sampleProcessor(job);
        break;
      default:
        Logger.log('info', JSON.stringify(job.data));
        break;
    }
  },
  { connection }
);

const queueEvents = new QueueEvents('My Queue', { connection });

const bootstrap = async () => {
  serverAdapter.setBasePath('/api/v1/admin/queues');

  createBullBoard({
    queues: [new BullMQAdapter(appQueue)],
    serverAdapter,
  });

  queueEvents.on('waiting', ({ jobId }) => {
    Logger.log('info', `A job with ID ${jobId} is waiting`);
  });

  queueEvents.on('active', ({ jobId, prev }) => {
    (async () => {
      Logger.log('info', `Job ${jobId} is now active; previous status was ${prev}`);
      const job = await appQueue.getJob(jobId);
      await sampleEvent(job);
    })();
  });

  queueEvents.on('completed', ({ jobId, returnvalue }) => {
    (async () => {
      Logger.log('info', `${jobId} has completed and returned ${returnvalue}`);
      const job = await appQueue.getJob(jobId);
      await job.updateProgress(100);
    })();
  });

  queueEvents.on('failed', ({ jobId, failedReason }) => {
    Logger.log('info', `${jobId} has failed with reason ${failedReason}`);
  });

  Logger.log('info', `BullMQ is ready to use`);
};

export { addJobs, bootstrap, serverAdapter };
