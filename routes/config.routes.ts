import { Request, Response } from 'express';

import { router as app } from './router';
import { Config } from '../models/config.model';

app.get('/config', (res: Response) => {

    Config.findAll(
        {}
    ).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

app.get('/config/:nombre', (req: Request, res: Response) => {
    const nombre = req.params.nombre;

    Config.findAll({
        where: {
            propiedad: nombre
        },
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

app.post('/config', (req: Request, res: Response) => {
    let body = req.body;

    Config.create({
        propiedad: body.propiedad,
        valor: body.valor,
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

app.put('/config/:propiedad', (req: Request, res: Response) => {
    let body = req.body;
    const propiedad = req.params.propiedad;

    Config.update({
        valor: body.valor
    }, {
        where: { propiedad }
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

app.delete('/config/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    Config.destroy({
        where: { id }
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

export default app;