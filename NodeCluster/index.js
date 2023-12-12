const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;
console.log("CPUlength"+numCPUs);
console.log("Worker - ID "+process.pid);
//a Boolean value that determines whether the current process is the master process. 
//If it is the master process, it can create child processes using the fork() method
if (cluster.isMaster) {
    console.log("master: ");
    for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
    //console.log("WorkerID"+ worker.process.pid)
    //creates a new process, copying all settings 
    //and objects of the current process, and starts a new Node.js instance to run the same code.
 }
} else {
    http.createServer((req, res) => {
    res.end("hello world");
 }).listen(8088, () => {
    console.log("listen 8088");
 });
}
//cluster.isWorker: a Boolean value that determines whether the current process is a worker process.
// If it is a worker process, it can execute specific business code.