const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/registrar', (res, req) => {

});

app.listen(PORT, () => {
    console.log('Iniciado na porta 3000: ' + `http://localhost:${PORT}/`);
});