import Server from './classes/server';
import router from './routes/router';
//
import usuarios from './routes/usuarios.routes'
import marcas from './routes/marcas.routes'
import vehiculos from './routes/vehiculos.routes'
import login from './routes/login.routes'
import viajes from './routes/viajes.routes'
import config from './routes/config.routes'
// import mercadopago from './routes/mercadopago.routes'
import contactos from './routes/contactos.routes'
import codes from './routes/codes.routes'
import archivos from './routes/archivos.routes'
// 
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';



const server = Server.instance;

// BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({ origin: true, credentials: true }));

server.app.use('/', (express.static('public', { redirect: false })));

// Rutas de servicios
server.app.use('/api', router);
server.app.use('/api', usuarios);
server.app.use('/api', marcas);
server.app.use('/api', vehiculos);
server.app.use('/api', login);
server.app.use('/api', viajes);
server.app.use('/api', config);
// server.app.use('/api', mercadopago);
server.app.use('/api', contactos);
server.app.use('/api', codes);
server.app.use('/api', archivos);
// Angular
server.app.get('*', (req, res, next) => {
    res.sendFile(path.resolve('public/index.html'));
});

server.start(() => {
    console.log(`✅  Server online in port ${server.port}`);
});


