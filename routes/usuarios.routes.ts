import { Request, Response } from 'express';

import { router as app } from './router';
import bcrypt from 'bcrypt';
import { Usuarios } from '../models/usuarios.model';


app.get('/usuarios', /*[verificaToken, verificaAdmin_Role],*/(res: Response) => {
    Usuarios.findAll({
        order: [
            ['nombre', 'DESC'],
        ]
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

app.get('/usuarios/:id', /*[verificaToken],*/(req: Request, res: Response) => {
    const id = req.params.id;

    Usuarios.findByPk(id, {
        order: [
            ['nombre', 'DESC'],
        ]
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

app.get('/usuarios/saldo/:id', /*[verificaToken],*/async (req: Request, res: Response) => {
    const id = req.params.id;

    // TODO: Terminar esta ruta

    // const usuario = await UsuariosSchema.findById(id).exec();
    // let fondos = usuario?.fondos;

    // console.log("Fondos agregados" + fondos);
    // const viajes = await ViajesSchema.find({ conductor: usuario?.id });
    // viajes.forEach((e) => {
    //     fondos! -= e.precio * 0.1;
    // });

    // console.log("Fondos totales" + fondos);
    // res.json({
    //     ok: true,
    //     fondos
    // });
});

app.get('/usuarios/active/:id', /*[verificaToken],*/async (req: Request, res: Response) => {
    const id = req.params.id;

    Usuarios.findByPk(id).then((data) => {
        const active = data?.getDataValue('active');

        return res.json({
            ok: true,
            active,
        });
    }).catch(err => res.status(400).json({ ok: false, err }));
});

app.post('/usuarios', (req: Request, res: Response) => {
    let body = req.body;

    body.email = body.email.trim();
    body.password = bcrypt.hashSync(body.password, 10);

    Usuarios.create({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        telefono: body.telefono,
        foto: body.foto,
        tipo: body.tipo,
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

// app.post('/usuarios/alert', /*[verificaToken],*/async (req: Request, res: Response) => {

// });

app.put('/usuarios/:id', /*[verificaToken],*/async (req: Request, res: Response) => {

    const id = req.params.id;
    let body = req.body;

    Usuarios.update({
        nombre: body.nombre,
    }, { where: { id } }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

// + Saldo
app.put('/usuarios/saldo/agregar/:id', async (req: Request, res: Response) => {

    // TODO: Terminar esta ruta

    // const id = req.params.id;
    // let body = req.body;

    // let valorAnterior = await UsuariosSchema.findById(id).exec();

    // valorAnterior!.fondos += body.fondos;

    // UsuariosSchema.findByIdAndUpdate(id, { fondos: valorAnterior?.fondos }, { new: true, runValidators: true }, (err, data) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         data: data
    //     });
    // });
});

// - Saldo
app.put('/usuarios/saldo/remover/:id', async (req: Request, res: Response) => {

    // TODO: Terminar esta ruta
    // const id = req.params.id;
    // let body = req.body;

    // let valorAnterior = await UsuariosSchema.findById(id).exec();

    // if (valorAnterior?.fondos) {
    //     valorAnterior.fondos -= body.fondos;
    // }


    // UsuariosSchema.findByIdAndUpdate(id, { fondos: valorAnterior?.fondos }, { new: true, runValidators: true }, (err, data) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         data: data
    //     });
    // });
});

// Agregar calificacion
// app.put('/usuarios/cal/:id', async (req: Request, res: Response) => {

//     const id = req.params.id;
//     let body = req.body;

//     UsuariosSchema.findByIdAndUpdate(id, {
//         $push: {
//             cal: body.cal,
//         }
//     }, { new: true, runValidators: true }, (err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }

//         res.json({
//             ok: true,
//             data: data
//         });
//     });
// });

app.put('/usuarios/activar/:id', /*[verificaToken, verificaAdmin_Role],*/(req: Request, res: Response) => {
    let id = req.params.id;

    Usuarios.update({
        active: true,
    }, { where: { id } })
        .then((data) => res.json({ ok: true, data })
        ).catch(err => res.status(400).json({ ok: false, err }));
});

app.delete('/usuarios/:id', /*[verificaToken, verificaAdmin_Role],*/(req: Request, res: Response) => {
    let id = req.params.id;

    Usuarios.destroy({
        where: { id }
    }).then((data) => res.json({ ok: true, data })
    ).catch(err => res.status(400).json({ ok: false, err }));
});

export default app;