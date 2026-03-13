import { workerData, parentPort } from 'node:worker_threads';

const transform = (_) => {
  return {
    success: true,
    data: 'App Worker is ready to use',
  };
};

parentPort.postMessage({
  data: transform(workerData).data,
});
