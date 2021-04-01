import { Router, Request, Response } from 'express';

import { router as app } from './router';
import * as _ from 'underscore';

import VehiculosSchema from '../models/vehiculos.model';
import { MongoError } from 'mongodb';

app.get('/vehiculos', (req: Request, res: Response) => {
    VehiculosSchema
        .find({ active: true })
        .populate('cliente')
        .populate('marca')
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

app.get('/vehiculos/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    VehiculosSchema.findById(id)
        .populate('cliente')
        .populate('marca')
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

// Por usuario
app.get('/vehiculos/usuario/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    VehiculosSchema.find({ cliente: id })
        .populate('cliente')
        .populate('marca')
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

app.post('/vehiculos', (req: Request, res: Response) => {
    let body = req.body;

    let values = new VehiculosSchema({
        placa: body.placa,
        marca: body.marca,
        submarca: body.submarca,
        color: body.color,
        foto: body.foto,
        cliente: body.cliente,
        poliza: body.poliza,
    });

    VehiculosSchema.create(values, (err: MongoError, data: any) => {
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

app.put('/vehiculos/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    let body = _.pick(req.body, [
        'submarca',
        'active',
    ]);

    VehiculosSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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

app.delete('/vehiculos/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    VehiculosSchema.findByIdAndUpdate(id, { active: false }, { new: true, runValidators: true }, (err, data) => {
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