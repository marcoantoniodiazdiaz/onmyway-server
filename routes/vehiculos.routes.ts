import { Request, Response } from 'express';

import { router as app } from './router';

import { Vehiculos } from '../models/vehiculos.model';

app.get('/vehiculos', (res: Response) => {

    Vehiculos.findAll()
        .then((data) => res.json({ ok: true, data })
        ).catch(err => res.status(400).json({ ok: false, err }));
});

app.get('/vehiculos/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    Vehiculos.findByPk(id)
        .then((data) => res.json({ ok: true, data })
        ).catch(err => res.status(400).json({ ok: false, err }));
});

// Por usuario
app.get('/vehiculos/usuario/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    // TODO: Terminar esta ruta

    // VehiculosSchema.find({ cliente: id })
    //     .populate('cliente')
    //     .populate('marca')
    //     .exec((err, data) => {
    //         if (err) {
    //             return res.status(400).json({
    //                 ok: false,
    //                 err
    //             });
    //         }

    //         res.json({
    //             ok: true,
    //             data
    //         });
    //     });
});

app.post('/vehiculos', (req: Request, res: Response) => {
    let body = req.body;

    Vehiculos.create({
        placa: body.placa,
        marca: body.marca,
        submarca: body.submarca,
        color: body.color,
        cliente: body.cliente,
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

app.put('/vehiculos/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    let body = req.body;

    Vehiculos.update({
        marca: body.marca,
        submarca: body.submarca,
        color: body.color,
    }, {
        where: { id }
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

app.delete('/vehiculos/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    Vehiculos.destroy({
        where: { id }
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));

});

export default app;