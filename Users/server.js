const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware для обработки JSON данных

const db = mysql.createConnection({
    host: "localhost",
    user: 'construction',
    password: 'kct9Bs62XfzFA4VB',
    database: 'construction'
});

// Маршрут для получения информации о сервере
app.get('/', (req, res) => { 
    return res.json("From backends");
});

// Маршрут для получения пользователей из базы данных
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM name";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: 'Error querying data' });
        return res.json(data);
    });
});

// Маршрут для обновления статуса дозвона
app.put('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const assignedLeads = req.body.assigned_leads;

    const sql = "UPDATE name SET assigned_leads = ? WHERE id = ?";
    db.query(sql, [JSON.stringify(assignedLeads), userId], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).json({ error: 'Error updating data' });
        }
        console.log('Data updated successfully');
        return res.status(200).json({ message: 'Data updated successfully' });
    });
});
app.get('/users/:userId/leads', (req, res) => {
    const userId = req.params.userId;
  
    // Выполнить запрос к базе данных для получения лидов пользователя
    const sql = "SELECT * FROM leads WHERE id IN (SELECT assigned_leads FROM users WHERE id = ?)";
    db.query(sql, [userId], (err, data) => {
      if (err) {
        console.error('Error querying leads:', err);
        return res.status(500).json({ error: 'Error querying leads' });
      }
      return res.json(data);
    });
  });
// Маршрут для аутентификации пользователя
app.post('/login', (req, res) => {
    const { name, password } = req.body;
    
    // Проверка наличия имени пользователя и пароля в запросе
    if (!name || !password) {
        return res.status(400).json({ error: 'Name and password are required' });
    }
    
    // Ваш код для проверки правильности имени пользователя и пароля
    // Пример:
    const sql = "SELECT * FROM name WHERE name = ? AND password = ?";
    db.query(sql, [name, password], (err, results) => {
        if (err) {
            console.error('Error authenticating user:', err);
            return res.status(500).json({ error: 'Error authenticating user' });
        }
        if (results.length === 0) {
            // Пользователь с указанными учетными данными не найден
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        // Пользователь успешно аутентифицирован
        return res.status(200).json({ success: true, message: 'Login successful' });
    });
});

// Запуск сервера на порту 8082
app.listen(8084, () => {
    console.log("Server is listening on port 8082");
});

