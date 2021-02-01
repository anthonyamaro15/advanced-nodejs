const http = require('http');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;


// npm i loadtest ( to test request )
// loadtest -n 500 http://localhost:3000    ( - 500 request to localhost:3000 )
// in case we get a lof of traffic it would split the traffic into different workers
if(cluster.isMaster) {
   console.log('this is the master process: ', process.pid);
   // if too much traffic then split it into different workers
   for(let  i = 0; i < numCPUs; i++) {
      cluster.fork();
   }
} else {
   // render server.js here
   http.createServer((req, res) => {
      const message = `Worker: ${process.pid}`;
      console.log(message);
      res.end(message);
   }).listen(3000);
}