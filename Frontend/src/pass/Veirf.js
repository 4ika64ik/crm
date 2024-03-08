import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from '../userList/UserList';
import './style.css';

const LoginForm = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null); // Store logged-in user ID

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://construction-build.com:8084/login', {
        name,
        password
      });

      if (response.data.success) {
        // Set cookie with token and expiry time
        document.cookie = `authToken=${"Bearer " + response.data.token}; expires=${new Date(Date.now() + 20000).toUTCString()}`;
        setIsLoggedIn(true);
        setUserId(response.data.userId); // Store user ID after successful login
      } else {
        setError('Неверное имя пользователя или пароль');
      }
    } catch (error) {
      setError('Ошибка входа. Попробуйте еще раз.');
    }
  };

  useEffect(() => {
    // Check for existing authToken cookie on initial render
    const cookie = document.cookie.split(';').find(c => c.startsWith('authToken='));
    if (cookie) {
      setIsLoggedIn(true);
    }

    const timeout = setTimeout(() => {
      // Clear cookie and reset state on timeout
      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      setIsLoggedIn(false);
      setUserId(null);
      setError("Время сеанса истекло. Пожалуйста, войдите снова.");
    }, 20000); // 20 seconds

    return () => clearTimeout(timeout);
  }, []);

  if (isLoggedIn) {
    return <UserList userId={userId} />;
  }

  return (
    <div>
      <h2>Форма входа</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;
