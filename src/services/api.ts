import axios from 'axios';

const API = axios.create({
  baseURL: 'https://cae-bookstore.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// export const setAuthToken = (token: string | null) => {
//   if (token) {
//     API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete API.defaults.headers.common['Authorization'];
//   }
// };



export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('userToken', JSON.stringify(token));
  } else {
    localStorage.removeItem('userToken');
  }
};

export const getAuthToken = (): string | null => {
  const token = localStorage.getItem('userToken');
  return token ? JSON.parse(token) : null;
};


export default API;