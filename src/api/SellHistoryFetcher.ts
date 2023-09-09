import axios from 'axios';
import { BASE_URL } from './axios';
import { API_ENDPOINT } from './endPoint';

export const getSellHistory = async ({
  cursor,
  isSold,
  nickname,
}: {
  cursor?: number;
  isSold?: boolean;
  nickname: string;
}) => {
  const url = new URL(BASE_URL + API_ENDPOINT.SELL_HISTORY(nickname));

  cursor !== undefined && url.searchParams.append('cursor', String(cursor));
  isSold !== undefined && url.searchParams.append('isSold', String(isSold));

  const res = await axios.get(url.toString());

  return res.data;
};
