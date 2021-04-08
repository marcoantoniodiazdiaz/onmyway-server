import { Request, Response } from 'express';

import { router as app } from './router';

import { Marcas } from '../models/marcas.model';

app.get('/marcas', (res: Response) => {

    Marcas.findAll({
        order: ['nombre']
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

app.get('/marcas/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    Marcas.findByPk(id)
        .then((data) => res.json({ ok: true, data })
        ).catch(err => res.status(400).json({ ok: false, err }));
});

app.post('/marcas', (req: Request, res: Response) => {
    let body = req.body;

    Marcas.create({
        nombre: body.nombre,
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

app.put('/marcas/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    let body = req.body;

    Marcas.update({
        nombre: body.nombre,
    }, {
        where: { id }
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

app.delete('/marcas/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    Marcas.destroy({
        where: { id }
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));

});

export default app;