
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Для обслуживания статических файлов

// Конфигурация базы данных
const dbConfig = {
    host: "localhost",
    user: "root",
    database: "registration",
    password: "",
    port: 3306
};



// Регистрация
app.post('/register', async (req, res) => {
    const { name, email, password, gender, interests, country, about } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            `INSERT INTO users (name, email, password, gender, interests, country, about) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, email, hashedPassword, gender, interests, country, about]
        );
        await connection.end();
        
        res.json({ success: true, userId: result.insertId });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: 'Email уже зарегистрирован' });
        }
        console.error('Ошибка регистрации:', err);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

// Авторизация
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );
        await connection.end();
        
        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Пользователь не найден' });
        }
        
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Неверный пароль' });
        }
        
        // Не возвращаем пароль в ответе
        delete user.password;
        res.json({ success: true, user });
    } catch (err) {
        console.error('Ошибка авторизации:', err);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

// Получение данных пользователя
app.get('/user/:id', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            `SELECT id, name, email, gender, interests, country, about
             FROM users WHERE id = ?`,
            [req.params.id]
        );
        await connection.end();
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Пользователь не найден' });
        }
        
        res.json({ success: true, user: rows[0] });
    } catch (err) {
        console.error('Ошибка получения данных:', err);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});