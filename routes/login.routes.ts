import { Request, Response } from 'express';

import { router as app } from './router';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { validarGoogleIDToken } from '../helpers/google-verify-token';
import { Usuarios } from '../models/usuarios.model';
import sequelize from '../database/database';

app.post('/login', (req: Request, res: Response) => {

    let body = req.body;

    if (body.password === "" || body.email === "") {
        return res.status(400).json({
            ok: false,
            err: 'Los campos son invalidos'
        });
    }

    Usuarios.findOne({
        where: { email: body.emai },
    }).then((data) => {
        if (!data) {
            return res.status(400).json({
                ok: false,
                err: 'No hay ninguna cuenta asociada a este correo electronico'
            });
        }

        if (!bcrypt.compareSync(body.password, data.getDataValue('password'))) {
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
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

app.post('/login/google', async (req: Request, res: Response) => {

    const body = req.body;

    const t = await sequelize.transaction();

    if (!body.token) {
        return res.status(400).json({
            ok: false,
            err: 'Token invalido'
        });
    }

    const usuario = await validarGoogleIDToken(body.token);
    if (!usuario) {
        return res.status(401).json({
            ok: false,
            err: "Failed authentication",
        })
    }

    try {
        const usuarioDB = await Usuarios.findOne({
            where: { email: usuario.email }
        });

        if (!usuarioDB) {
            const nuevoUsuario = await Usuarios.create({
                nombre: usuario.username,
                email: usuario.email,
                password: "",
                telefono: "0000000000",
                foto: usuario.picture,
                tipo: "USER_ROLE",
                google: true

            }, { transaction: t });

            const token = jwt.sign(
                { nuevoUsuario }, "jkw~3bBCCg*aU^XZ2ywmKru2.=P{v-9vNp(B$w'J'KK<ufC4g$", { expiresIn: '1d' }
            );

            t.commit(); // Guardamos el registro

            return res.json({
                ok: true,
                data: nuevoUsuario,
                token
            });


        } else {
            const token = jwt.sign(
                { usuarioDB }, "jkw~3bBCCg*aU^XZ2ywmKru2.=P{v-9vNp(B$w'J'KK<ufC4g$", { expiresIn: '1d' }
            );

            return res.json({
                ok: true,
                data: usuarioDB,
                token
            });
        }

    } catch (error) {
        t.rollback();
        return res.status(401).json({
            ok: true,
            err: 'Datos de inicio de sesión invalidos',
        });
    }
});


export default app;