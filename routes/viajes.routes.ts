import { Router, Request, Response } from 'express';

import { router as app } from './router';
import * as _ from 'underscore';

import ViajesSchema from '../models/viajes.model';
import { MongoError } from 'mongodb';

app.get('/viajes', (req: Request, res: Response) => {
    ViajesSchema.find()
        .sort({
            fecha: -1
        })
        .limit(50)
        .populate('conductor')
        .populate('usuarioId')
        .populate({
            path: 'vehiculo',
            populate: 'marca'
        })
        .exec((err, data) => {
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

app.get('/viajes/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    ViajesSchema.findById(id)
        .sort({
            fecha: -1
        })
        .exec((err, data) => {
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


app.get('/viajes/usuario/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    ViajesSchema.find({ usuarioId: id })
        .exec((err, data) => {
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


app.get('/viajes/conductor/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    ViajesSchema.find({ conductor: id })
        .sort({
            fecha: 1,
        })
        .exec((err, data) => {
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

app.post('/viajes', (req: Request, res: Response) => {
    let body = req.body;
    console.log(body);
    // console.log(body);

    let values = new ViajesSchema({
        fromLat: body.fromLat,
        fromLon: body.fromLon,
        toLat: body.toLat,
        toLon: body.toLon,
        fromEscrito: body.fromEscrito,
        toEscrito: body.toEscrito,
        // usuario: body.usuario,
        usuarioId: body.usuarioId,
        fecha: new Date().toISOString(),
        precio: body.precio,
        distancia: body.distancia,
    });

    ViajesSchema.create(values, (err: MongoError, data: any) => {
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

app.put('/viajes/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    let body = _.pick(req.body, [
        'submarca',
        'conductor',
        'vehiculo',
        'active',
    ]);

    ViajesSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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

app.delete('/viajes/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    ViajesSchema.findByIdAndRemove(id, (err, data) => {
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