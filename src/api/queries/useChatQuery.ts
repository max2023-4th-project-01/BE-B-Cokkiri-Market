import { useQuery } from '@tanstack/react-query';
import { ChatRoomType } from '../../page/chat/ChatRoom';
import { ChattingItemType } from '../../page/chat/ChattingItem';
import { getChatRoom, getChatRooms } from '../fetchers/chatFetcher';

const CHAT_ROOMS_KEY = 'chatRooms';
const CHAT_ROOM_KEY = 'chatRoom';

export const useGetChatRooms = () => {
  return useQuery<ChattingItemType[]>([CHAT_ROOMS_KEY], getChatRooms);
};

export const useGetChatRoom = (chatRoomId: number) => {
  return useQuery<ChatRoomType>([CHAT_ROOM_KEY], () => getChatRoom(chatRoomId));
};
