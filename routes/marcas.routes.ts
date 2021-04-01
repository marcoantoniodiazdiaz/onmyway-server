import { Router, Request, Response } from 'express';

import { router as app } from './router';
import * as _ from 'underscore';

import MarcasSchema from '../models/marcas.model';
import { MongoError } from 'mongodb';

app.get('/marcas', (req: Request, res: Response) => {
    MarcasSchema.find({ active: true })
        .sort({ nombre: 1 })
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

app.get('/marcas/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    MarcasSchema.findById(id).exec((err, data) => {
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

app.post('/marcas', (req: Request, res: Response) => {
    let body = req.body;

    let values = new MarcasSchema({
        nombre: body.nombre,
    });

    MarcasSchema.create(values, (err: MongoError, data: any) => {
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

app.put('/marcas/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    let body = _.pick(req.body, [
        'nombre',
        'active',
    ]);

    MarcasSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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

app.delete('/marcas/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    MarcasSchema.findByIdAndUpdate(id, { active: false }, { new: true, runValidators: true }, (err, data) => {
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