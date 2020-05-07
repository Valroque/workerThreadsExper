const { Worker } = require('worker_threads');

const spawnAndCallWorkers = async mssg => {
  (new Worker('./wokerFile.js', { workerData: mssg }))
    .on('message', mssg => console.log('Main Thread: msg', mssg))
    .on('message', err => console.log('Main Thread: err', err))
    .on('exit', code => console.log('Main Thread: exit', code));
}

for(let i of [1,2,3]) {
  spawnAndCallWorkers(`Main Thread: sending message: ${i}`);
}
