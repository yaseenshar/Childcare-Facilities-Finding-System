export const API_BASE_URL: string = 'http://localhost:8080/api/';
export const API_BASE_URL_AUTH: string = `${API_BASE_URL}auth/`;


export const API_ENDPOINTS: { [key: string]: string } = {
  signin: 'signin',
  signup: 'signup',
  facilitiesTypes: 'facilities/types',
  facilitiesIds: 'facilities/ids',
  profile: 'user',
  userFavorites: 'user/{userId}/favorite-places',
  userDeleteFavorites: 'user/{favId}/favorite-places',
  usersActive: 'user/status/active',
  usersInActive: 'user/status/inactive',

};