import { fetcher } from '../axios';
import { API_ENDPOINT } from '../endPoint';

export const getChatRooms = async () => {
  const res = await fetcher.get(API_ENDPOINT.CHAT_ROOMS);

  return res.data;
};

export const getChatRoom = async (chatRoomId: number) => {
  const res = await fetcher.get(`${API_ENDPOINT.CHAT_ROOMS}/${chatRoomId}`);

  return res.data;
};
