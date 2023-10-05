// import { useCallback, useState } from 'react';
// import { WS_BASE_URL } from '../api/axios';
// import { MessageType } from '../page/chat/ChatRoom';
// export const useWebSocket = (onMessage: (message: MessageType) => void) => {
//   const [ws, setWs] = useState<WebSocket>();

//   const connectWS = useCallback((chatRoomId: number) => {
//     setWs(new WebSocket(`${WS_BASE_URL}/api/ws/pub/chatrooms/${chatRoomId}`));
//   }, []);

//   const closeWS = useCallback(() => {
//     ws?.close();
//   }, [ws]);

//   const sendMessage = (message: string) => {
//     ws?.send(JSON.stringify({ content: message }));
//   };

//   if (ws) {
//     ws.onmessage = message => {
//       const data = JSON.parse(message.data);
//       onMessage(data);
//     };
//   }

//   return { connectWS, closeWS, sendMessage };
// };

import { Client } from '@stomp/stompjs';
import { useCallback, useState } from 'react';
import { WS_BASE_URL } from '../api/axios';
import { MessageType } from '../page/chat/ChatRoom';
import { useAuthStore } from '../stores/useAuthStore';

export const useStomp = (onMessage: (message: MessageType) => void) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const { accessToken } = useAuthStore();

  const connectWS = useCallback(
    (chatRoomId: number) => {
      const client = new Client({
        brokerURL: `${WS_BASE_URL}/api/ws`,
        onConnect: () => {
          client.subscribe(`/sub/chatrooms/${chatRoomId}`, message => {
            const data: MessageType = JSON.parse(message.body);
            onMessage(data);
          });
        },

        connectHeaders: {
          Authorization: accessToken,
        },
      });

      client.activate();
      setStompClient(client);
    },
    [onMessage, accessToken]
  );

  const closeWS = useCallback(() => {
    if (stompClient) {
      stompClient.deactivate();
    }
  }, [stompClient]);

  const sendMessage = (message: string, chatroomId: number) => {
    if (stompClient) {
      stompClient.publish({
        destination: `/pub/chatrooms/${chatroomId}`,
        body: JSON.stringify({ content: message }),
      });
    }
  };

  return { connectWS, closeWS, sendMessage };
};
