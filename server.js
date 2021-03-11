const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const PORT = 3000;
const { user, password } = require('/home/jean/Documentos/my_sql_password.json');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Verifica se tem erros
process.on('uncaughtException', err => {
    console.log(err);
});

app.get('/registro', (res, req) => {
    req.sendFile(path.join(__dirname, 'public', 'registro.html'));
    req.sendFile(path.join(__dirname, 'public', 'CSS', 'index.css'));
});

app.post('/api/registrar', (req, res) => {
    const email = req.body.email;
    const passwordPOST = req.body.password;

    // Conecta ao mysql
    const conn = mysql.createConnection({
        host: "localhost",
        user: user,
        password: password,
        database: "testes"
    });
    
    conn.connect(err => {
        if (err) throw err;
        console.log('Conectado com sucesso');
        
        // Coloca email, senha para o database
        conn.query(`INSERT INTO users02 (Email, Password) VALUES ('${email}', '${passwordPOST}');`, err => {
            if (err) {
                res.status(404).send('Erro interno no database');
                throw err;
            };
        });
    });

    res.status(200);
// ER_DUP_ENTRY
});

app.listen(PORT, () => {
    console.log('Iniciado na porta 3000: ' + `http://localhost:${PORT}/`);
});