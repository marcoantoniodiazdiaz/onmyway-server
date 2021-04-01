import { Router, Request, Response } from 'express';

import { router as app } from './router';
import * as _ from 'underscore';

import ContactosSchema from '../models/contacto.model';
import { MongoError } from 'mongodb';

// app.get('/contactos', (req: Request, res: Response) => {
//     ContactosSchema.find()
//         .sort({ nombre: 1 })
//         .exec((err, data) => {
//             if (err) {
//                 return res.status(400).json({
//                     ok: false,
//                     err
//                 });
//             }

//             res.json({
//                 ok: true,
//                 data
//             });
//         });
// });

// Contactos de cierta persona
app.get('/contactos/de/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    ContactosSchema.find({ de: id }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            data
        });
    });
});

app.post('/contactos', (req: Request, res: Response) => {
    let body = req.body;

    let values = new ContactosSchema({
        nombre: body.nombre,
        email: body.email,
        de: body.de,
    });

    ContactosSchema.create(values, (err: MongoError, data: any) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            data
        });
    });
});

app.put('/contactos/alerta/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    return res.json({
        ok: true,
        id
    });
});

app.put('/contactos/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    let body = _.pick(req.body, [
        'nombre',
        'email',
    ]);

    ContactosSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            data: data
        });
    });
});

app.delete('/contactos/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    ContactosSchema.findByIdAndRemove(id, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            data: data
        });
    });
});

export default app;