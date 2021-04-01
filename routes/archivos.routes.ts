import { Router, Request, Response } from 'express';

import { router as app } from './router';
import * as _ from 'underscore';
import ArchivosSchema from '../models/archivos.model';
import { MongoError } from 'mongodb';

app.get('/archivos/:usuario', (req: Request, res: Response) => {

    const usuario = req.params.usuario;

    ArchivosSchema.find({ active: true, usuario })
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


app.post('/archivos', (req: Request, res: Response) => {
    let body = req.body;

    let values = new ArchivosSchema({
        usuario: body.usuario,
        url: body.url,
        tipo: body.tipo
    });

    ArchivosSchema.create(values, async (err: MongoError, data: any) => {
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

app.delete('/archivos/:id', (req: Request, res: Response) => {

    const id = req.params.id;

    ArchivosSchema.findByIdAndUpdate(id, { active: false })
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

export default app;