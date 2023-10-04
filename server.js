// eslint-disable-next-line import/order
import express from 'express';
import http from 'http';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ws = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });
const chatrooms = {};

app.get('/', (req, res) => {
  res.send('Hello, JavaScript with ESM!');
});

wss.on('connection', (ws, req) => {
  const chatroomId = new URL(req.url, `http://${req.headers.host}`).pathname
    .split('/')
    .pop();

  if (!chatroomId) return;

  if (!chatrooms[chatroomId]) {
    chatrooms[chatroomId] = [];
  }

  const currentRoom = chatrooms[chatroomId];
  currentRoom.push(ws);

  ws.on('message', message => {
    console.log(`Received message for chatroom ${chatroomId} => ${message}`);

    currentRoom.forEach(client => {
      if (client.readyState === ws.OPEN) {
        client.send(
          JSON.stringify({
            id: Date.now(),
            isSent: client === ws,
            content: JSON.parse(message).content,
          })
        );
      }
    });
  });

  ws.on('close', () => {
    chatrooms[chatroomId] = chatrooms[chatroomId].filter(
      client => client !== ws
    );
  });
});

server.listen(8080, () => {
  console.log('Server started on http://localhost:8080 with ESM');
});
