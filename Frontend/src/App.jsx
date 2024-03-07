import React, { useEffect, useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    fetch('http://localhost:8081/users')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8081/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      console.log('Submission successful:', data);
      setData([...data, formData]); // Assuming the response from the server contains the new data
      setFormData({
        name: '',
        phone: '',
        email: ''
      });
    })
    .catch(err => console.error('Error submitting form:', err));
  };

  return (
    <div style={{ padding: "50px" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.phone}</td>
              <td>{d.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
