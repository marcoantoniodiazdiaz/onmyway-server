// import { Request, Response } from 'express';

// import { router as app } from './router';
// import * as _ from 'underscore';

// import ConfigSchema from '../models/config.model';
// import { MongoError } from 'mongodb';
// import axios from 'axios';

// app.post('/mp/crear-preference', async (req: Request, res: Response) => {
//     let body = req.body;

//     console.log(body.cantidad)
//     console.log(body.email)

//     const resp = await axios.post('https://api.mercadopago.com/checkout/preferences?access_token=TEST-6477187309722777-081923-28e1a4b4b295ee3c4cd865fa923d00d5-628570439', {
//         "items": [
//             {
//                 "title": "Saldo Vamonos $" + body.cantidad,
//                 "description": "Saldo para nuevos viajes",
//                 "quantity": 1,
//                 "currency_id": "MXN",
//                 "unit_price": body.cantidad
//             }
//         ],
//         "payer": {
//             "email": body.email
//         }
//     }, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }
//     );
//     console.log(resp);

//     res.json({
//         ok: true,
//         data: resp.data,
//     });
// });

// app.post('/mp/payment', async (req: Request, res: Response) => {
//     let body = req.body;

//     console.log(body.cantidad)
//     console.log(body.email)

//     const resp = await axios.post('https://api.mercadopago.com/checkout/preferences?access_token=TEST-6477187309722777-081923-28e1a4b4b295ee3c4cd865fa923d00d5-628570439', {
//         "items": [
//             {
//                 "title": "Saldo Vamonos $" + body.cantidad,
//                 "description": "Saldo para nuevos viajes",
//                 "quantity": 1,
//                 "currency_id": "MXN",
//                 "unit_price": body.cantidad
//             }
//         ],
//         "payer": {
//             "email": body.email
//         }
//     }, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }
//     );
//     console.log(resp);

//     res.json({
//         ok: true,
//         data: resp.data,
//     });
// });

// app.get('/config/:nombre', (req: Request, res: Response) => {
//     const nombre = req.params.nombre;

//     ConfigSchema.findOne({ propiedad: nombre }).exec((err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }


//         res.json({
//             ok: true,
//             data
//         });
//     });
// });

// app.post('/config', (req: Request, res: Response) => {
//     let body = req.body;

//     let values = new ConfigSchema({
//         propiedad: body.propiedad,
//         valor: body.valor,
//     });

//     ConfigSchema.create(values, (err: MongoError, data: any) => {
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }

//         res.json({
//             ok: true,
//             data
//         });
//     });
// });

// app.put('/config/:propiedad', (req: Request, res: Response) => {
//     const propiedad = req.params.propiedad;
//     let body = _.pick(req.body, [
//         'propiedad',
//         'valor',
//     ]);

//     ConfigSchema.findOneAndUpdate({ propiedad }, body, { new: true, runValidators: true }, (err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }

//         res.json({
//             ok: true,
//             data: data
//         });
//     });
// });

// app.delete('/config/:id', (req: Request, res: Response) => {
//     const id = req.params.id;

//     ConfigSchema.findByIdAndUpdate(id, { active: false }, { new: true, runValidators: true }, (err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }

//         res.json({
//             ok: true,
//             data: data
//         });
//     });
// });

// export default app;