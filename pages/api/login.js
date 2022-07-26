import * as db from '../../backend/data/db';
import * as session from '../../backend/core/session';
import * as jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export default async function login(req, res) {
    let user = await db.findAccount(req.body.email);
    if (!user) {
        return res.status(400).send({ msg: 'Correo o contraseña inválido' });
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({
            email: user.email,
            names: user.names,
            lastNames: user.lastNames,
            lastLogin: user.lastLogin,
            id: user.id,
        }, 'optileapsecret', { expiresIn: 60 * 60 * 24 * 7 });
        await session.save({
            email: user.email,
            token
        })
        return res.status(200).send({token, success: true});
    } else {
        return res.status(400).send({ msg: 'Correo o contraseña inválida' });
    }
}