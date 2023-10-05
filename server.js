// // eslint-disable-next-line import/order
// import express from 'express';
// import http from 'http';
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const StompServer = require('stomp-broker-js');
// const ws = require('ws');

// const app = express();
// const server = http.createServer(app);
// const wss = new ws.Server({ noServer: true });

// const stompServer = new StompServer({ server: wss });

// const chatrooms = {};

// app.get('/', (req, res) => {
//   res.send('Hello, STOMP Server!');
// });

// stompServer.subscribe('/pub/chatrooms/:chatroomId', (msg, headers) => {
//   const chatroomId = headers.destination.split('/').pop();
//   const message = JSON.parse(msg);

//   console.log(
//     `Received message for chatroom ${chatroomId} => ${message.content}`
//   );

//   if (!chatrooms[chatroomId]) {
//     chatrooms[chatroomId] = [];
//   }

//   chatrooms[chatroomId].forEach(client => {
//     client.send(
//       JSON.stringify({
//         id: Date.now(),
//         content: message.content,
//       })
//     );
//   });
// });

// server.on('upgrade', (request, socket, head) => {
//   wss.handleUpgrade(request, socket, head, ws => {
//     wss.emit('connection', ws, request);
//   });
// });

// server.listen(8080, () => {
//   console.log('STOMP server started on http://localhost:8080');
// });
import express from 'express';
import http from 'http';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const StompServer = require('stomp-broker-js');

const app = express();
const server = http.createServer(app);

const stompServer = new StompServer({ server, path: '/api/ws' });

const chatrooms = {};

stompServer.subscribe('/sub/chatrooms/:chatroomId', (msg, headers) => {
  const chatroomId = headers.destination.split('/').pop();
  const message = JSON.parse(msg.body);

  console.log(
    `Received message for chatroom ${chatroomId} => ${message.content}`
  );

  if (!chatrooms[chatroomId]) {
    chatrooms[chatroomId] = [];
  }

  stompServer.send(
    `/pub/chatrooms/${chatroomId}`,
    {},
    JSON.stringify({
      id: Date.now(),
      content: message.content,
    })
  );
});

server.listen(8080, () => {
  console.log('STOMP server started on http://localhost:8080');
});
