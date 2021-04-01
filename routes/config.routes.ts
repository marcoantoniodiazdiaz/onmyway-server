import { Router, Request, Response } from 'express';

import { router as app } from './router';
import * as _ from 'underscore';

import ConfigSchema from '../models/config.model';
import { MongoError } from 'mongodb';

app.get('/config', (req: Request, res: Response) => {
    ConfigSchema.find()
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

app.get('/config/:nombre', (req: Request, res: Response) => {
    const nombre = req.params.nombre;

    ConfigSchema.findOne({ propiedad: nombre }).exec((err, data) => {
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

app.post('/config', (req: Request, res: Response) => {
    let body = req.body;

    let values = new ConfigSchema({
        propiedad: body.propiedad,
        valor: body.valor,
    });

    ConfigSchema.create(values, (err: MongoError, data: any) => {
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

app.put('/config/:propiedad', (req: Request, res: Response) => {
    const propiedad = req.params.propiedad;
    let body = _.pick(req.body, [
        'propiedad',
        'valor',
    ]);

    ConfigSchema.findOneAndUpdate({ propiedad }, body, { new: true, runValidators: true }, (err, data) => {
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

app.delete('/config/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    ConfigSchema.findByIdAndUpdate(id, { active: false }, { new: true, runValidators: true }, (err, data) => {
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