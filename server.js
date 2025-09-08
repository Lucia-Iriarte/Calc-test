const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const HISTORIAL_FILE = 'historial.json';

app.use(express.json());

// GET: Devuelve el historial
app.get('/historial', (req, res) => {
    fs.readFile(HISTORIAL_FILE, 'utf8', (err, data) => {
        if (err) return res.json([]);
        res.json(JSON.parse(data));
    });
});

// POST: Agrega una nueva entrada al historial
app.post('/historial', (req, res) => {
    const nuevaEntrada = req.body;
    fs.readFile(HISTORIAL_FILE, 'utf8', (err, data) => {
        let historial = [];
        if (!err && data) historial = JSON.parse(data);
        historial.push(nuevaEntrada);
        fs.writeFile(HISTORIAL_FILE, JSON.stringify(historial, null, 2), () => {
            res.json({ status: 'ok' });
        });
    });
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));