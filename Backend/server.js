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
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Маршрут для отправки данных в базу данных
app.post('/submit', (req, res) => {
    const { name, phone, email } = req.body;
    const sql = "INSERT INTO users (name, phone, email) VALUES (?, ?, ?)";
    db.query(sql, [name, phone, email], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Error inserting data' });
        }
        console.log('Data inserted successfully');
        return res.status(200).json({ message: 'Data inserted successfully' });
    });
});

// Маршрут для обновления статуса дозвона
app.put('/update/:userId', (req, res) => {
    const userId = req.params.userId;
    const status = req.body.status;

    const sql = "UPDATE users SET called = ? WHERE id = ?";
    db.query(sql, [status, userId], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).json({ error: 'Error updating data' });
        }
        console.log('Data updated successfully');
        return res.status(200).json({ message: 'Data updated successfully' });
    });
});

// Запуск сервера на порту 8081
app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
