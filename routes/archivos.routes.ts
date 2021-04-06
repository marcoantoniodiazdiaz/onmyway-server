import { Request, Response } from 'express';

import { router as app } from './router';
import { Archivos } from '../models/archivos.model';
import { Usuarios } from '../models/usuarios.model';

app.get('/archivos/:usuario', (req: Request, res: Response) => {

    const id = req.params.usuario;

    Archivos.findAll({
        include: {
            model: Usuarios,
            where: { id },
        }
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});


app.post('/archivos', (req: Request, res: Response) => {
    let body = req.body;

    Archivos.create({
        usuario: body.usuario,
        url: body.url,
        tipo: body.tipo
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));

});

app.delete('/archivos/:id', (req: Request, res: Response) => {

    const id = req.params.id;

    Archivos.destroy({
        where: { id }
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));

});

export default app;