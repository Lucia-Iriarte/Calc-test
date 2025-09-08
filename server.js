// DELETE: Borra el historial
app.delete('/historial', (req, res) => {
    fs.writeFile(HISTORIAL_FILE, JSON.stringify([], null, 2), (err) => {
        if (err) return res.status(500).json({ status: 'error' });
        res.json({ status: 'borrado' });
    });
});
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;
const HISTORIAL_FILE = 'historial.json';

app.use(cors());
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
        if (!err && data) {
            try {
                historial = JSON.parse(data);
            } catch (e) {
                historial = [];
            }
        }
        historial.push(nuevaEntrada);
        fs.writeFile(HISTORIAL_FILE, JSON.stringify(historial, null, 2), (err) => {
            if (err) {
                res.status(500).json({ status: 'error', message: 'No se pudo guardar.' });
            } else {
                res.json({ status: 'ok' });
            }
        });
    });
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));