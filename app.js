const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();

const itemRoutes = require('./src/routes/itemRoutes')
const listRoutes = require('./src/routes/listRoutes')

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parse de JSON
app.use(express.json());

app.use(cors());

// Conectando ao MongoDB
mongoose.connect("mongodb+srv://wilnara:macaco@odonto-legal-api.rrjmhlj.mongodb.net/?retryWrites=true&w=majority&appName=Odonto-legal-API", {
}).then(() => {
    console.log('Conectado ao MongoDB!');
}).catch(err => {
    console.log('Erro ao conectar ao MongoDB:', err);
});

// Usando rotas
app.use('/api/items', itemRoutes);
app.use('/api/list', listRoutes);  

app.get('/', (req, res) => {
    res.end('Servidor rodando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
