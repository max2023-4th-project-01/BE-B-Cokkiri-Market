export const API_ENDPOINT = {
  LOGIN: '/api/login',
  SIGNUP: '/api/users',
  ITEMS: '/api/items',
  USER_LOCATION: '/api/users/locations',
  LOCATION_DATA: '/api/locations',
  CATEGORIES: '/api/categories',
  SALES_LIST: (nickname: string) => {
    return `/api/users/${nickname}/items`;
  },
  FAVORITES: '/api/users/favorites',
  FAVORITES_CATEGORY: '/api/users/favorites/categories',
  RECOMMENDED_CATEGORIES: '/api/categories/recommend',
  CHANGE_PROFILE_IMAGE: '/api/users/profile-image',
};
