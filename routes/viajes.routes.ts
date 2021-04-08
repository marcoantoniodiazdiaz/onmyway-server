import { Request, Response } from 'express';

import { router as app } from './router';
import { Viajes } from '../models/viajes.model';


app.get('/viajes', (res: Response) => {

    Viajes.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

app.get('/viajes/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    Viajes.findByPk(id, {})
        .then((data) => res.json({ ok: true, data })
        ).catch(err => res.status(400).json({ ok: false, err }));
});


app.get('/viajes/usuario/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    Viajes.findAll({
        where: { usuario: id },
        order: [
            ['createdAt', 'DESC']
        ],
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});


app.get('/viajes/conductor/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    Viajes.findAll({
        where: { conductor: id },
        order: [
            ['createdAt', 'DESC']
        ],
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

app.post('/viajes', (req: Request, res: Response) => {
    let body = req.body;

    Viajes.create({
        fromLat: body.fromLat,
        fromLon: body.fromLon,
        toLat: body.toLat,
        toLon: body.toLon,
        fromEscrito: body.fromEscrito,
        toEscrito: body.toEscrito,
        usuario: body.usuario,
        fecha: new Date().toISOString(),
        precio: body.precio,
        distancia: body.distancia,
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

app.put('/viajes/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    let body = req.body;

    Viajes.update({
        submarca: body.submarca,
        conductor: body.conductor,
        vehiculo: body.vehiculo,
    }, {
        where: { id }
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

app.delete('/viajes/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    Viajes.destroy({
        where: { id }
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));

});

export default app;