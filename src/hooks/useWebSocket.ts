import { useCallback, useState } from 'react';
import { MessageType } from '../page/chat/ChatRoom';
export const useWebSocket = (onMessage: (message: MessageType) => void) => {
  const [ws, setWs] = useState<WebSocket>();

  const connectWS = useCallback((chatRoomId: number) => {
    setWs(
      new WebSocket(`ws://localhost:8080/api/ws/pub/chatrooms/${chatRoomId}`)
    );
  }, []);

  const closeWS = useCallback(() => {
    ws?.close();
  }, []);

  const sendMessage = (message: string) => {
    ws?.send(JSON.stringify({ content: message }));
  };

  if (ws) {
    ws.onmessage = message => {
      const data = JSON.parse(message.data);
      onMessage(data);
    };
  }

  return { connectWS, closeWS, sendMessage };
};
