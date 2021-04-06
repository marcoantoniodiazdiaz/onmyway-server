import { Request, Response } from 'express';

import { router as app } from './router';
import { Contactos } from '../models/contacto.model';
import { Usuarios } from '../models/usuarios.model';

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

    Contactos.findAll({
        include: {
            model: Usuarios,
            where: { id }
        },
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

app.post('/contactos', (req: Request, res: Response) => {
    let body = req.body;

    Contactos.create({
        nombre: body.nombre,
        email: body.email,
        usuario: body.usuario,
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

/* app.put('/contactos/alerta/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    return res.json({
        ok: true,
        id
    });
}); */

app.delete('/contactos/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    Contactos.destroy({
        where: { id }
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

export default app;