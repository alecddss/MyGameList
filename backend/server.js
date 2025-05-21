const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(express.json({limit:'1mb'}))
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'game_app'
})

app.get('/', (re,res)=> {
    return res.json("From backend");
})

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/add-user', (req, res) => {
    const sql = "INSERT INTO `users` (`id`, `username`, `email`, `password`, `game_data`, `notifications`) VALUES (?)";
    
    const values = [
        req.body.id,
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.game_data,
        req.body.notifications
    ]
    
    db.query(sql,[values], (err,data) => {
        if(err) return res.json(err);
        return res.json("User sign up successful.");
    })
})

app.put('/game-to-list', (req, res) => {
    const sql = "UPDATE `users` SET `game_data` = JSON_ARRAY_APPEND(game_data, '$', ?) WHERE id = ?";

    const jsonString = JSON.stringify(req.body[0]);
    const userID = req.body[1];

    db.query(sql, [jsonString, userID], (err,data) => {
        if(err) return res.json(err);
        return res.json("Game added successfully.");
    })

})

app.put('/return-game-list', (req, res) => {
    const sql = "SELECT game_data FROM users WHERE id = ?";
    const value = req.body[0];

    db.query(sql, value, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT id, username, password FROM users WHERE username = ? OR email = ?";

    const value = req.body.username;

    db.query(sql, [value, value], (err, data) => {
        if(err) return res.json(err);

        const password = req.body.password; 
        
        //If username/email is incorrect, nothing will be returned. Must make sure that something is returned before checking passwords
        if(data.length > 0){
            if(password === data[0].password) return res.json([data[0].id, data[0].username]);
        }
        return res.json(false);
    })
})

app.listen(8081, () => {
    console.log("Listening");
})