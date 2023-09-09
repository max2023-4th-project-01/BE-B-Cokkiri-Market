export const API_ENDPOINT = {
  LOGIN: '/api/login',
  SIGNUP: '/api/users',
  ITEMS: '/api/items',
  USER_LOCATION: '/api/users/locations',
  LOCATION_DATA: '/api/locations',
  CATEGORIES: '/api/categories',
  SELL_HISTORY: (nickname: string) => {
    return `/api/users/${nickname}/items`;
  },
};
