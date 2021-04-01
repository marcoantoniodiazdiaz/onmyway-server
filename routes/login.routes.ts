import { Router, Request, Response } from 'express';

import { router as app } from './router';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import UsuariosSchema from '../models/usuarios.model';
import { validarGoogleIDToken } from '../helpers/google-verify-token';

app.post('/login', (req: Request, res: Response) => {

    let body = req.body;

    if (body.password === "" || body.email === "") {
        return res.status(400).json({
            ok: false,
            err: 'Los campos son invalidos'
        });
    }

    UsuariosSchema.findOne({ email: body.email }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!data) {
            return res.status(400).json({
                ok: false,
                err: 'No hay ninguna cuenta asociada a este correo electronico'
            });
        }

        if (!bcrypt.compareSync(body.password, data.password)) {
            return res.status(400).json({
                ok: false,
                err: 'La contraseña es incorrecta'
            });
        }

        let token = jwt.sign(
            { data }, "jkw~3bBCCg*aU^XZ2ywmKru2.=P{v-9vNp(B$w'J'KK<ufC4g$", { expiresIn: '60d' }
        );

        res.json({
            ok: true,
            data,
            token
        });
    });
});

app.post('/login/google', async (req: Request, res: Response) => {

    const body = req.body;

    if (!body.token) {
        return res.status(400).json({
            ok: false,
            err: 'Invalid token'
        });
    }

    const usuario = await validarGoogleIDToken(body.token);
    if (!usuario) {
        return res.status(401).json({
            ok: false,
            err: "Failed authentication",
        })
    }

    UsuariosSchema.findOne({
        email: usuario.email
    }).exec((err, data) => {

        if (err) {
            res.status(401).json({
                ok: false,
                err,
            });
        }

        if (!data) {

            let values = new UsuariosSchema({
                nombre: usuario.username,
                email: usuario.email,
                password: "",
                telefono: "0000000000",
                foto: usuario.picture,
                tipo: "USER_ROLE",
                google: true
            });

            UsuariosSchema.create(values, (err, r) => {

                if (err) {
                    res.status(401).json({
                        ok: false,
                        err,
                    });
                }

                const token = jwt.sign(
                    { r }, "jkw~3bBCCg*aU^XZ2ywmKru2.=P{v-9vNp(B$w'J'KK<ufC4g$", { expiresIn: '1d' }
                );
                return res.json({
                    ok: true,
                    data: r,
                    token
                });
            });
        } else {
            const token = jwt.sign(
                { data }, "jkw~3bBCCg*aU^XZ2ywmKru2.=P{v-9vNp(B$w'J'KK<ufC4g$", { expiresIn: '1d' }
            );

            return res.json({
                ok: true,
                data,
                token
            });
        }
    });
});


export default app;