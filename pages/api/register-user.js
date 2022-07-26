import * as db from '../../backend/data/db';

export default async function registerUser(req, res) {
    let user = await db.findUser(req.body.email);
    if (user) {
        return res.status(400).send({ msg: 'ya existe un usuario con ese correo' });
    }
    await db.registerUser(req.body.names, req.body.lastNames, req.body.email, req.body.password);
    return res.status(200).send({ success: true });
}