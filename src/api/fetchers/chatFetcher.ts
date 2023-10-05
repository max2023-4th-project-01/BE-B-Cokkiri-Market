import { fetcher, BASE_URL } from '../axios';
import { API_ENDPOINT } from '../endPoint';

export const getChatRooms = async (itemId?: number) => {
  const url = new URL(BASE_URL + API_ENDPOINT.CHAT_ROOMS);
  itemId !== undefined && url.searchParams.append('itemId', String(itemId));

  const res = await fetcher.get(url.toString());

  return res.data;
};

export const getChatRoom = async (chatRoomId: number) => {
  const res = await fetcher.get(`${API_ENDPOINT.CHAT_ROOMS}/${chatRoomId}`);

  return res.data;
};

export const createChatRoom = async (itemId: number) => {
  const res = await fetcher.post(API_ENDPOINT.CHAT_ROOMS, {
    itemId: itemId,
  });

  return res.data;
};
