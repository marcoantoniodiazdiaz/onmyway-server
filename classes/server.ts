
import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import mongoose from 'mongoose';

// import * as socket from '../sockets/socket';
import { createAssosiations } from '../database/assosiations';
import sequelize from '../database/database';

export default class Server {

    private static _intance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;


    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.escucharSockets();
        this.mysqlConnect();
        // this.mongoConnect();
    }

    public static get instance() {
        return this._intance || (this._intance = new this());
    }

    private async mysqlConnect() {
        createAssosiations();
        sequelize.sync({ force: true }).then(() => {
            console.log("✅  MySQL connection");
        }).catch((err) => {
            console.error(err);
        });
    }


    private escucharSockets() {
        console.log('✅  Socket server online');

        this.io.on('connection', cliente => {
            // // Conectar cliente
            // socket.conectarCliente(cliente, this.io);
            // // Configurar usuario
            // socket.configurarUsuario(cliente, this.io);
            // // Obtener usuarios activos
            // socket.obtenerUsuarios(cliente, this.io);
            // // Mensajes
            // socket.mensaje(cliente, this.io);
            // // Desconectar
            // socket.desconectar(cliente, this.io);
            // // Escuchar Posiciones
            // socket.escucharPosiciones(cliente, this.io);
            // // Configurar emision
            // socket.configurarEmision(cliente, this.io);
            // // Configurar emision
            // socket.obtenerViajes(cliente, this.io);
            // // Crear viaje
            // socket.crearViaje(cliente, this.io);
            // // Aceptar viaje
            // socket.aceptarViaje(cliente, this.io);
            // // Borrar viaje
            // socket.cancelarViaje(cliente, this.io);
            // // Recoji a una persona
            // socket.recojiConductor(cliente, this.io);
            // // Terminar viaje
            // socket.finalizarViaje(cliente, this.io);
            // // Toogle Usuario
            // socket.toggleUsuario(cliente, this.io);
            // // Verificar si un usuario estaba en viaje
            // socket.verificarUsuarioEnViaje(cliente, this.io);
        });

    }

    start(callback: Function) {
        this.httpServer.listen(this.port, callback);
    }

}