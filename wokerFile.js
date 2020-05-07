const { workerData, parentPort } = require('worker_threads');
console.log('Worker Data' + workerData);
parentPort.postMessage({ message:  workerData});