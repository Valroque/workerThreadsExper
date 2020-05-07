// testing 2 way comm bw the main and worker thread

const { Worker } = require('worker_threads');
const workers = [];
const spawnAndCallWorkers = async mssg => {
  const worker = new Worker('./wokerFile.js', { workerData: mssg });
  worker
    .on('message', mssg => console.log('Main Thread: msg', mssg))
    .on('message', err => console.log('Main Thread: err', err))
    .on('exit', code => console.log('Main Thread: exit', code));

  workers.push(worker);
}

spawnAndCallWorkers('start')
  .then(() => new Promise(res => {
    workers.forEach(w => w.postMessage("asd"))
    setTimeout(res, 1000);
  }))
  .then(() => workers[0].unref())