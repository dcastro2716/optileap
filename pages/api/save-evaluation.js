import * as db from '../../backend/data/db';
import * as jwt from "jsonwebtoken";
import * as session from "../../backend/core/session";

export default async function saveEvaluation(req, res) {
  let auth = req.headers['authorization'].substring("Bearer ".length);
  let jwToken = jwt.decode(auth);
  let email = jwToken.email;
  let alive = await session.verify(email, auth);
  if (!alive.valid) {
    return res.status(alive.status).send({msg: alive.msg});
  }
  let user = await db.findUser(req.body.userId, jwToken.id);
  if (!user) {
    return res.status(401).send({ msg: 'Usuario no le pertenece' });
  }
  await db.saveEvaluation(req.body.names, req.body.lastNames, req.body.email, req.body.weight,
    req.body.height, req.body.affiliation, req.body.birth, req.body.sex, req.body.time, req.body.jump, req.body.userId, jwToken.id);
  return res.status(200).send({ success: true });
}