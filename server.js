// 개발 환경에서 테스트하기 위해 임시로 만들어진 stomp socket 서버입니다.
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
