import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeadTable = ({ userId }) => {
  const [assignedLeads, setAssignedLeads] = useState([]);

  useEffect(() => {
    const fetchAssignedLeads = async () => {
      try {
        const response = await axios.get(`http://construction-build.com:8084/users/${userId}/leads`);
        setAssignedLeads(response.data);
      } catch (error) {
        console.error('Ошибка при получении назначенных лидов:', error);
      }
    };

    fetchAssignedLeads();
  }, [userId]);

  return (
    <div>
      <h2>Список назначенных лидов</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {assignedLeads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.id}</td>
              <td>{lead.name}</td>
              <td>{lead.phone}</td>
              <td>{lead.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
