import * as db from '../../backend/data/db';
import * as session from '../../backend/core/session';
import * as jwt from "jsonwebtoken";

export default async function deleteUser(req, res) {
  let auth = req.headers['authorization'].substring("Bearer ".length);
  let jwToken = jwt.decode(auth);
  let email = jwToken.email;
  let alive = await session.verify(email, auth);
  if (!alive.valid) {
    return res.status(alive.status).send({msg: alive.msg});
  }
  let count = await db.deleteUser(req.body.userId, jwToken.id);
  return res.status(200).send({ success: true, count: count.count});
}