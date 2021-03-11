const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/registro', (res, req) => {
    req.sendFile(path.join(__dirname, 'public', 'registro.html'));
    req.sendFile(path.join(__dirname, 'public', 'CSS', 'index.css'));
});

app.post('/api/registrar', (res, req) => {

});

app.listen(PORT, () => {
    console.log('Iniciado na porta 3000: ' + `http://localhost:${PORT}/`);
});