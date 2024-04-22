import React, { useState } from 'react';
import { login } from '../services/AuthService';
import { setAuthToken } from '../services/api';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login({ email, password })
      .then(response => {
        setAuthToken(response.data.token);
        console.log(response.data);
        let data = response.data;
        localStorage.setItem('userToken', JSON.stringify(data.token));
        // Handle successful login
      })
      .catch(error => {
        console.error(error);
        // Handle login error
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
