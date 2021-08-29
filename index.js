const express = require('express');
require('dotenv').config();

const cors = require('cors');

const { dbConnection } = require('./db/config');


// Crear el servidor de express
const app = express();

// configurar CORS
app.use(cors());

// Base de datos
dbConnection();


/* console.log( process.env); */

// Rutas
app.get( '/', (req,res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
});

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo ' +  process.env.PORT);
});