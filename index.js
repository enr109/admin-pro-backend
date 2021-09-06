const express = require('express');
require('dotenv').config();

const cors = require('cors');

const { dbConnection } = require('./db/config');


// Crear el servidor de express
const app = express();

// configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Directorio público
app.use(express.static('public'));


/* console.log( process.env); */

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo ' +  process.env.PORT);
});