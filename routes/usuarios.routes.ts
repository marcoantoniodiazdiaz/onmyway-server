import { Request, Response } from 'express';

import { router as app } from './router';
import bcrypt from 'bcrypt';
import * as _ from 'underscore';

import UsuariosSchema from '../models/usuarios.model';
import ContactosSchema from '../models/contacto.model';
import ViajesSchema from '../models/viajes.model';
import nodemailer from 'nodemailer';


app.get('/usuarios', /*[verificaToken, verificaAdmin_Role],*/(req: Request, res: Response) => {
    UsuariosSchema.find()
        .populate('documentos')
        .sort({ nombre: 1 })
        .exec(async (err, data) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            const usuarios = data;
            for (let i = 0; i < usuarios.length; i++) {
                const usuario = usuarios[i];
                let fondos = usuario?.fondos;
                const viajes = await ViajesSchema.find({ conductor: usuario?.id });
                viajes.forEach((e) => {
                    fondos! -= e.precio * 0.1;
                });
                usuario.fondos = fondos;
            }

            res.json({
                ok: true,
                data: usuarios
            });
        });
});

app.get('/usuarios/:id', /*[verificaToken],*/(req: Request, res: Response) => {
    const id = req.params.id;

    UsuariosSchema.findById(id).sort({
        nombre: 1
    })
        .populate('documentos')
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

app.get('/usuarios/saldo/:id', /*[verificaToken],*/async (req: Request, res: Response) => {
    const id = req.params.id;

    const usuario = await UsuariosSchema.findById(id).exec();
    let fondos = usuario?.fondos;

    console.log("Fondos agregados" + fondos);
    const viajes = await ViajesSchema.find({ conductor: usuario?.id });
    viajes.forEach((e) => {
        fondos! -= e.precio * 0.1;
    });

    console.log("Fondos totales" + fondos);
    res.json({
        ok: true,
        fondos
    });
});

app.get('/usuarios/active/:id', /*[verificaToken],*/async (req: Request, res: Response) => {
    const id = req.params.id;

    UsuariosSchema.findById(id, ['active'])
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            const active = data?.active;

            res.json({
                ok: true,
                active
            });
        });
});

app.post('/usuarios', (req: Request, res: Response) => {
    let body = req.body;

    const firstPass = body.password;

    body.email = body.email.trim();
    body.password = bcrypt.hashSync(body.password, 10);

    let values = new UsuariosSchema({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        telefono: body.telefono,
        foto: body.foto,
        tipo: body.tipo,
    });

    UsuariosSchema.create(values, async (err, data: any) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // const transporter = nodemailer.createTransport({
        //     host: 'mail.vamonosbymonsivais.com',
        //     port: 587,
        //     secure: false,
        //     auth: {
        //         user: 'noreply@vamonosbymonsivais.com',
        //         pass: 'jGFmHcSq34q5X2C'
        //     },
        //     tls: {
        //         rejectUnauthorized: false,
        //     }
        // });

        const contentHTML = `
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
        </head>
        
        <body style="background-color: rgb(244, 244, 244);">
            <div style="width: 100%; height: 150px; background-color: rgb(37, 67, 107); padding-top: 30px;">
                <div class="container text-center" style="background-color: white; padding: 50px; ">
                    <h1>Bienvenido a Vamonos.</h1>
                    <p class="mt-3 " style="font-size: 130%; ">Nos complace en darle la bienvenida a nuestro sistema</p>
                    <div class="text-left mt-5 ">
                        <span>Sus credenciales de registro son:</span><br>
                        <span><strong>Email:</strong> ${body.email}</span><br>
                        <span><strong>Contraseña:</strong> ${firstPass}</span><br>
                        <span>Luego de ingresar usted puede cambiar su contraseña en el apartado de perfil.</span>
                    </div>
                </div>
                <div class="container text-center mb-5" style="background-color: rgb(37, 67, 107); padding: 30px; ">
                    <strong style="font-size: 120%; color: white;">¿Nesesitas ayuda?</strong><br>
                    <span style="color: white; text-decoration: underline; ">Sigue este enlace y podemos contestar tus
                        preguntas</span>
                </div>
            </div>
        </body>
        
        </html>
        `;

        // const info = await transporter.sendMail({
        //     from: "'Dirección Vamonos' <noreply@vamonosbymonsivais.com>",
        //     to: data.email,
        //     subject: 'Bienvenido a Vamonos',
        //     html: contentHTML,
        // });

        res.json({
            ok: true,
            data,
            // email: info.messageId
        });
    });
});

// app.post('/usuarios/changePassword/', /*[verificaToken],*/async (req: Request, res: Response) => {

//     let body = req.body;

//     let user = await UsuariosSchema.findOne({ activado: true, password: body.password0 }, '_id').exec();
//     let id = user?._id;

//     if (id === null) {
//         return res.json({
//             ok: false,
//             err: 'Esta sesión a expirado',
//         });
//     }

//     const bodyN = {
//         password: bcrypt.hashSync(body.password1, 10),
//     }

//     UsuariosSchema.findByIdAndUpdate(id, bodyN, { new: true, runValidators: true }, (err, data) => {
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

app.post('/usuarios/alert', /*[verificaToken],*/async (req: Request, res: Response) => {
    let body = req.body;

    const id = body.id;

    const usuarios = await ContactosSchema.find({ de: id }).exec();

    const transporter = nodemailer.createTransport({
        host: 'mail.vamonosbymonsivais.com',
        port: 587,
        secure: false,
        auth: {
            user: 'noreply@vamonosbymonsivais.com',
            pass: 'jGFmHcSq34q5X2C'
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    const contentHTML = `
    <html>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    </head>
    
    <body style="background-color: rgb(244, 244, 244);">
        <div style="width: 100%; height: 150px; background-color: rgb(37, 67, 107); padding-top: 30px;">
            <div class="container text-center" style="background-color: white; padding: 50px; ">
                <h1>ALERTA DE USUARIO</h1>
                <p class="mt-3 " style="font-size: 130%; ">Un usuario a emitido una alerta, intente ponerse en contacto con
                    el lo mas pronto posible</p>
                <div class="text-left mt-5 ">
                    <span>La información del usuario es:</span><br>
                    <span><strong>Nombre completo: </strong> Marco Antonio Diaz Diaz </span><br>
                    <span><strong>Situación: </strong>En un viaje con DANIEL DIAZ DIAZ</span><br>
                    <span><strong>Telefono: </strong>3315856646</span><br>
                    <span><strong>Latitud: </strong>LAT</span><br>
                    <span><strong>Longitud: </strong>LON</span><br>
                </div>
            </div>
            <div class="container text-center mb-5" style="background-color: rgb(37, 67, 107); padding: 30px; ">
                <strong style="font-size: 120%; color: white;">¿Nesesitas ayuda?</strong><br>
                <span style="color: white; text-decoration: underline; ">Sigue este enlace y podemos contestar tus
                    preguntas</span>
            </div>
        </div>
    </body>
    
    </html>
    `;

    usuarios.forEach(async (e) => {

        const i = await transporter.sendMail({
            from: "'Dirección Vamonos' <noreply@vamonosbymonsivais.com>",
            to: e.email,
            subject: 'ALERTA DE USUARIO',
            html: contentHTML,
        });

        console.log(i);
    });

    res.json({
        ok: true,
        // email: info.messageId
    });
});

app.put('/usuarios/:id', /*[verificaToken],*/async (req: Request, res: Response) => {

    const id = req.params.id;

    let body = req.body;

    UsuariosSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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

// + Saldo
app.put('/usuarios/saldo/agregar/:id', async (req: Request, res: Response) => {

    const id = req.params.id;
    let body = req.body;

    let valorAnterior = await UsuariosSchema.findById(id).exec();

    valorAnterior!.fondos += body.fondos;

    UsuariosSchema.findByIdAndUpdate(id, { fondos: valorAnterior?.fondos }, { new: true, runValidators: true }, (err, data) => {
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

// - Saldo
app.put('/usuarios/saldo/remover/:id', async (req: Request, res: Response) => {

    const id = req.params.id;
    let body = req.body;

    let valorAnterior = await UsuariosSchema.findById(id).exec();

    if (valorAnterior?.fondos) {
        valorAnterior.fondos -= body.fondos;
    }


    UsuariosSchema.findByIdAndUpdate(id, { fondos: valorAnterior?.fondos }, { new: true, runValidators: true }, (err, data) => {
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

// Agregar calificacion
app.put('/usuarios/cal/:id', async (req: Request, res: Response) => {

    const id = req.params.id;
    let body = req.body;

    UsuariosSchema.findByIdAndUpdate(id, {
        $push: {
            cal: body.cal,
        }
    }, { new: true, runValidators: true }, (err, data) => {
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

app.put('/usuarios/activar/:id', /*[verificaToken, verificaAdmin_Role],*/(req: Request, res: Response) => {
    let id = req.params.id;

    UsuariosSchema.findByIdAndUpdate(id, { active: true }, (err, data) => {
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

app.delete('/usuarios/:id', /*[verificaToken, verificaAdmin_Role],*/(req: Request, res: Response) => {
    let id = req.params.id;

    UsuariosSchema.findByIdAndUpdate(id, { active: false }, (err, data) => {
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