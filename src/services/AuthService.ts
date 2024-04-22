import API, {getAuthToken} from './api';

interface UserCredentials {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export const register = (credentials: UserCredentials) => {
  return API.post('/user', credentials);
};

export const login = (credentials: { email: string; password: string }) => {
  return API.get('/login', { auth: { username: credentials.email, password: credentials.password } });
};

export const updateUser = (data: any) => {
  const token = getAuthToken();
  console.log('token', token);
  return API.put('/user', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = () => {
  const token = getAuthToken();
  return API.delete('/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
