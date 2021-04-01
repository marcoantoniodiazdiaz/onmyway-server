import { Request, Response } from 'express';

import { router as app } from './router';

import CodesSchema from '../models/codes.model';
import UsuariosSchema from '../models/usuarios.model';
import { MongoError } from 'mongodb';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

app.post('/codes', (req: Request, res: Response) => {
    let body = req.body;

    const newCode = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000).toString();

    let values = new CodesSchema({
        email: body.email,
        valor: newCode,
    });

    CodesSchema.create(values, async (err: MongoError, data: any) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

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
                    <h1>Recuperación de contraseña de Vamonos</h1>
                    <!-- <img src="https://gymaccess.com.mx/wp-content/uploads/2020/03/GYMWEB2.png" height="60px " class="mt-4 "><br> -->
                    <p class="mt-3 " style="font-size: 130%; ">Tu codigo de recuperación es:</p>
                    <p style="font-size: 2.5rem; font-weight: bold;">${newCode}</p>
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

        console.log(body.email)

        const info = await transporter.sendMail({
            from: "'Dirección Vámonos' <noreply@vamonosbymonsivais.com>",
            to: body.email,
            subject: 'Recuperación de contraseña',
            html: contentHTML,
        });

        console.log(info.messageId);


        res.json({
            ok: true,
            data,
            email: info.messageId
        });
    });
});

app.post('/codes/verify', (req: Request, res: Response) => {
    let body = req.body;

    const newPassword = bcrypt.hashSync(body.password, 10);
    console.log('Hola');
    console.log(body);

    CodesSchema.findOne({ valor: body.valor }).exec((err, datax) => {
        console.log(datax);
        if (datax) {
            UsuariosSchema.findOneAndUpdate({ email: datax.email }, { password: newPassword }, { new: true, runValidators: true }, (err, data) => {
                if (err) {
                    return res.json({
                        ok: false,
                        err
                    });
                }

                CodesSchema.findByIdAndRemove(datax._id, (err, datay) => {
                    if (datay) {
                        res.json({
                            ok: true,
                            data: datay
                        });
                    } else {
                        res.json({
                            ok: false,
                            err
                        });
                    }
                });
            });
        } else {
            res.json({
                ok: false,
                err: 'El codigo es invalido o ya caduco'
            });
        }
    });
});

export default app;