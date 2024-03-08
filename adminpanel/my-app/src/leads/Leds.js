import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const LeadTable = () => {
  const [leads, setLeads] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);
  const [assignedLeads, setAssignedLeads] = useState([]);

  const fetchAssignedLeads = async () => {
    try {
      const response = await axios.get('http://185.230.64.242:8084/users');
      setAssignedLeads(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leadsResponse = await axios.get('http://185.230.64.242:8081/users');
        setLeads(leadsResponse.data);
        
        const usersResponse = await axios.get('http://185.230.64.242:8084/users');
        setUsers(usersResponse.data);
        
        fetchAssignedLeads();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSelectLead = (leadId) => {
    if (selectedLeads.includes(leadId)) {
      setSelectedLeads(selectedLeads.filter(id => id !== leadId));
    } else {
      setSelectedLeads([...selectedLeads, leadId]);
    }
  };

  const handleAssignLeads = async () => {
    try {
      await axios.put(`http://185.230.64.242:8084/users/${selectedUser}`, {
        assigned_leads: selectedLeads
      });
      setSelectedLeads([]);
      setSelectedUser('');
      fetchAssignedLeads();
    } catch (error) {
      console.error('Ошибка при передаче лидов:', error);
    }
  };

  const getAssignedUserName = (leadId) => {
    const assignedUser = assignedLeads.find(user => {
      const assignedLeadsArray = JSON.parse(user.assigned_leads || '[]');
      return assignedLeadsArray.includes(leadId);
    });
    return assignedUser ? assignedUser.name : 'Не назначено';
  };

  return (
    <div>
      <h2>Список лидов</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>Выбрать</th>
            <th>Назначен</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.id}</td>
              <td>{lead.name}</td>
              <td>{lead.phone}</td>
              <td>{lead.email}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedLeads.includes(lead.id)}
                  onChange={() => handleSelectLead(lead.id)}
                />
              </td>
              <td>{getAssignedUserName(lead.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Выбрать пользователя</h2>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Выберите пользователя</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <button onClick={handleAssignLeads}>Передать выбранные лиды</button>
      </div>
    </div>
  );
};

export default LeadTable;
