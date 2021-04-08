// import { Socket } from 'socket.io';
// import socketIO from 'socket.io';
// import { UsuariosLista } from '../classes/usuarios-lista';
// import { Usuario } from '../classes/usuario';
// import { ViajesLista } from '../classes/viajes-lista';
// import { Viajes } from '../classes/viajes';
// import axios from 'axios';
// import ViajesSchema from '../models/viajes.model';


// export const usuariosConectados = new UsuariosLista();
// export const viajes = new ViajesLista();


// export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {

//     cliente.on('connect', () => {
//         console.log('Nuevo cliente conectado')
//     });

//     const usuario = new Usuario(cliente.id);
//     io.emit('usuarios-activos', usuariosConectados.getLista());
//     usuariosConectados.agregar(usuario);
// }


// export const desconectar = (cliente: Socket, io: socketIO.Server) => {
//     cliente.on('disconnect', () => {
//         console.log('🔴  Cliente desconectado');
//         usuariosConectados.borrarUsuario(cliente.id);
//         io.emit('usuarios-activos', usuariosConectados.getLista());
//     });
// }


// // Escuchar mensajes
// export const mensaje = (cliente: Socket, io: socketIO.Server) => {
//     cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
//         console.log('Mensaje recibido', payload);
//         io.emit('mensaje-nuevo', { ...payload, de: cliente.id });
//     });
// }

// // Configurar usuario
// export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
//     cliente.on('configurar-usuario', (payload: { nombre: string, tipo: string, idDatabase: string, nToken: string }, callback: Function) => {
//         usuariosConectados.actualizarNombre(cliente.id, payload.nombre, payload.idDatabase, payload.tipo, payload.nToken);
//         io.emit('usuarios-activos', usuariosConectados.getLista());
//     });
// }

// // Configurar usuario
// export const configurarEmision = (cliente: Socket, io: socketIO.Server) => {
//     cliente.on('configurar-emision', (payload, callback: Function) => {
//         usuariosConectados.configurarEmision(cliente.id, payload.emitiendo, payload.tipo);
//         io.emit('actualiza-marcador', usuariosConectados.getUsuario(cliente.id));
//     });
// }


// // Obtener Usuarios
// export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
//     cliente.on('obtener-usuarios', () => {
//         io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
//     });
// }

// // Obtener Usuarios
// export const cambiarCoche = (cliente: Socket, io: socketIO.Server) => {
//     cliente.on('cambia-coche', (payload) => {
//         usuariosConectados.cambiarCoche(cliente.id, payload.coche);
//         io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
//     });
// }

// // Actualizar posicion
// export const escucharPosiciones = (cliente: Socket, io: socketIO.Server) => {
//     cliente.on('emitir-posicion', (data) => {
//         usuariosConectados.actualizaPosicion(cliente.id, data.lat, data.lon, data.idDatabase);
//         io.emit('actualiza-marcador', usuariosConectados.getUsuario(cliente.id));
//         //console.log(usuariosConectados.getUsuario(cliente.id))
//     });
// }

// export const obtenerViajes = (cliente: Socket, io: socketIO.Server) => {
//     cliente.on('obtenerViajes', () => {
//         io.to(cliente.id).emit('lista-viajes', viajes.getLista());

//     });
// }

// // Lo emite el pasajero
// export const crearViaje = (cliente: Socket, io: socketIO.Server) => {
//     cliente.on('crear-viaje', (payload: { id: string, usuario: string, usuarioId: string, usuarioFoto: string, fromLat: number, fromLon: number, toLat: number, toLon: number, fromEscrito: string, toEscrito: string, precio: number, distancia: number, comentarios: string }) => {
//         const viaje = new Viajes(payload.id, payload.usuario, payload.usuarioId, payload.usuarioFoto, payload.fromLat, payload.fromLon, payload.toLat, payload.toLon, payload.fromEscrito, payload.toEscrito, payload.precio, payload.distancia, payload.comentarios);
//         // console.log(payload);
//         viajes.agregar(viaje);
//         console.log('✅🚖  Viaje agregado');
//         const emitirViaje = viajes.getViaje(payload.id);
//         // delete emitirViaje?.coche;
//         // Enviar notificacion

//         const usuarios = usuariosConectados.getLista();
//         // console.log(usuarios);
//         io.to(cliente.id).emit('nuevo-viaje', emitirViaje);
//         usuarios.forEach((e) => {
//             if (e.tipo === 'DRIVER_ROLE' && e.emitiendo) {
//                 io.to(e.id).emit('nuevo-viaje', emitirViaje);
//                 console.log('Enviando mensaje a: ' + e.nToken);
//                 axios.post('https://fcm.googleapis.com/fcm/send', {
//                     "notification": {
//                         "title": "Nuevo viaje ✅",
//                         "body": `Un usuario agrego un viaje de ${payload.distancia.toPrecision(2)} km, y un costo de $${payload.precio} MXN toca para ver más`,
//                         "sound": "default"
//                     },
//                     "priority": "high",
//                     "data": {
//                         "click_action": "FLUTTER_NOTIFICATION_CLICK",
//                         "id": 1,
//                         "status": "done"
//                     },
//                     "to": e.nToken
//                 }, {
//                     headers: {
//                         'Authorization': 'key=AAAAy4lXUqQ:APA91bFc41NbgAqNTE-_c0VJLxXThAAjlFzoUxMEAHfNdefD8vlLVcGJ5WMbW3sadyQA5sdJyTElJnq-VhqYODbdWFnx4ymuGPUK2UpwU7M0JOjcaXDSVe4aonYcK71ZJUuBDjzqsNbh',
//                         'Content-Type': 'application/json'
//                     }
//                 });
//             }
//         });
//         //
//     });
// }

// // Lo emite el conductor
// export const aceptarViaje = (cliente: Socket, io: socketIO.Server) => {
//     cliente.on('aceptar-viaje', (payload: { id: string, conductor: string, conductorId: string, conductorFoto: string, coche: any }) => {
//         const viaje = viajes.getViaje(payload.id);
//         ViajesSchema.findByIdAndUpdate(payload.id, {
//             conductor: payload.conductorId,
//             vehiculo: payload.coche._id
//         }, { new: true, runValidators: true }, (err, _) => {
//             if (err) {
//                 console.log('Error en la ejecucion del establecimiento del vehiculo');
//             }

//             console.log('Coche cambiado correctamente');
//         });
//         viajes.cambiarEstado(viaje?.id!, 'ACCEPTED')
//         viajes.agregarConductorViaje(viaje?.id!, payload.conductor, payload.conductorId, payload.conductorFoto, payload.coche);
//         viajes.ocultar(viaje?.id!);

//         usuariosConectados.verIdLista(viaje?.usuarioId!).forEach((e) => {
//             io.to(e).emit('viaje-aceptado', viajes.getViaje(payload.id));
//         });

//         usuariosConectados.getLista().forEach((e) => {
//             if (e.idDatabase !== viaje?.conductorId && e.idDatabase !== viaje?.usuarioId) {
//                 io.to(usuariosConectados.verIdDeSocket(e.idDatabase!)!).emit('viaje-cancelado', viajes.getViaje(payload.id));
//             }
//         });
//     });
// }

// export const cancelarViaje = (cliente: Socket, io: socketIO.Server) => {
//     cliente.on('cancelar-viaje', (payload: { id: string }) => {
//         io.emit('viaje-cancelado', viajes.getViaje(payload.id),);
//         viajes.borrarViaje(payload.id);
//         console.log('❌🚖  Viaje eliminado');
//     });
// }

// export const recojiConductor = (cliente: Socket, io: socketIO.Server) => {
//     cliente.on('recoji-conductor', (payload: { id: string }) => {
//         const viaje = viajes.getViaje(payload.id);
//         viajes.cambiarEstado(viaje?.id!, 'INPROGRESS')

//         usuariosConectados.verIdLista(viaje?.usuarioId!).forEach((e) => {
//             io.to(e).emit('fuiste-recojido', viajes.getViaje(payload.id));
//         });

//         const usuarios = usuariosConectados.getLista();

//         usuarios.forEach((e) => {

//             if (e.idDatabase === viaje?.usuarioId) {
//                 axios.post('https://fcm.googleapis.com/fcm/send', {
//                     "notification": {
//                         "title": "Saludos!",
//                         "body": `Tu conductor a llegado a tu puerta`,
//                         "sound": "default"
//                     },
//                     "priority": "high",
//                     "data": {
//                         "click_action": "FLUTTER_NOTIFICATION_CLICK",
//                         "id": 1,
//                         "status": "done"
//                     },
//                     "to": e.nToken
//                 }, {
//                     headers: {
//                         'Authorization': 'key=AAAAy4lXUqQ:APA91bFc41NbgAqNTE-_c0VJLxXThAAjlFzoUxMEAHfNdefD8vlLVcGJ5WMbW3sadyQA5sdJyTElJnq-VhqYODbdWFnx4ymuGPUK2UpwU7M0JOjcaXDSVe4aonYcK71ZJUuBDjzqsNbh',
//                         'Content-Type': 'application/json'
//                     }
//                 });
//             }
//         });

//     });
// }

// export const finalizarViaje = (cliente: Socket, io: socketIO.Server) => {
//     cliente.on('terminar-viaje', (payload: { id: string }) => {
//         const viaje = viajes.getViaje(payload.id);
//         viajes.cambiarEstado(viaje?.id!, 'END')
//         usuariosConectados.verIdLista(viaje?.usuarioId!).forEach((e) => {
//             io.to(e).emit('tu-viaje-termino', viajes.getViaje(payload.id));
//         });
//         viajes.getViajesPorUsuario(cliente.id);
//         io.to(usuariosConectados.verIdDeSocket(viaje?.conductorId!)!).emit('tu-viaje-termino', viajes.getViaje(payload.id));
//     });
// }

// export const toggleUsuario = (cliente: Socket, io: socketIO.Server) => {
//     cliente.on('toggleUsuario', (payload: { id: string, toggle: boolean }) => {
//         io.to(usuariosConectados.verIdDeSocket(payload.id)!).emit('cambio-usuario', payload.toggle);
//     });
// }


// export const verificarUsuarioEnViaje = (cliente: Socket, io: socketIO.Server) => {
//     cliente.on('estoy-en-viaje-?', () => {
//         const viajesUsuario = viajes.getViajesPorUsuario(cliente.id);

//         io.to(cliente.id).emit('tus-viajes', viajesUsuario)
//     });

// }
