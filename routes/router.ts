
import { Router, Request, Response } from 'express';
// import Server from '../classes/server';
// import { usuariosConectados } from '../sockets/socket';
// import { Mapa } from '../classes/mapa';
// import { ViajesLista } from '../classes/viajes-lista';
// import axios from 'axios';

const router = Router();
// const mapa = new Mapa();
// const viajes = new ViajesLista();

export { router };

router.get('hola', (req: Request, res: Response) => {
    res.json({ ok: true });
});

// router.post('/sockets/mensajes/:id', (req: Request, res: Response) => {

//     const cuerpo = req.body.cuerpo;
//     const de = req.body.de;
//     const id = req.params.id;

//     const payload = {
//         de,
//         cuerpo
//     }

//     const server = Server.instance;

//     server.io.in(id).emit('mensaje-privado', payload);

//     res.json({
//         ok: true,
//         cuerpo,
//         de,
//         id
//     });
// });


// // Servicio para obtener todos los IDs de los usuarios
// router.get('/sockets/usuarios', (req: Request, res: Response) => {

//     const server = Server.instance;

//     server.io.clients((err: any, clientes: string[]) => {
//         if (err) {
//             return res.json({
//                 ok: false,
//                 err
//             })
//         }

//         res.json({
//             ok: true,
//             clientes
//         });
//     });
// });

// // Obtener usuarios y sus nombres
// router.get('/sockets/usuarios/detalle', (req: Request, res: Response) => {
//     res.json({
//         ok: true,
//         // clientes: usuariosConectados.getLista()
//     });
// });

// // Obtener viajes
// router.get('/sockets/viajes', (req: Request, res: Response) => {
//     res.json(viajes.getLista());
// });

// // Enviar notificación
// router.post('/sockets/viajes', async (req: Request, res: Response) => {
//     let body = req.body;

//     console.log(body);

//     await axios.post('https://fcm.googleapis.com/fcm/send', {
//         "notification": {
//             "title": body.titulo,
//             "body": body.cuerpo,
//             "sound": "default"
//         },
//         "priority": "high",
//         "data": {
//             "click_action": "FLUTTER_NOTIFICATION_CLICK",
//             "id": 1,
//             "status": "done"
//         },
//         "to": body.nToken
//     }, {
//         headers: {
//             'Authorization': 'key=AAAAy4lXUqQ:APA91bFc41NbgAqNTE-_c0VJLxXThAAjlFzoUxMEAHfNdefD8vlLVcGJ5WMbW3sadyQA5sdJyTElJnq-VhqYODbdWFnx4ymuGPUK2UpwU7M0JOjcaXDSVe4aonYcK71ZJUuBDjzqsNbh',
//             'Content-Type': 'application/json'
//         }
//     });

//     res.json({
//         ok: true,
//     });
// });

export default router;


