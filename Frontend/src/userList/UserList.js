import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://185.230.64.242:8081/users');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleCall = async (userId) => {
    try {
      await axios.put(`http://185.230.64.242:8081/update/${userId}`, { status: 1 });
      console.log('Дозвонился пользователю с ID:', userId);
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  const handleNoAnswer = async (userId) => {
    try {
      await axios.put(`http://185.230.64.242:8081/update/${userId}`, { status: 0 });
      console.log('Не дозвонился пользователю с ID:', userId);
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  return (
    <div className="container">
      
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.called}</td>
              <td>
                <button className="call-btn" onClick={() => handleCall(user.id)}>Дозвон</button>
                <button className="no-answer-btn" onClick={() => handleNoAnswer(user.id)}>Не дозвон</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
