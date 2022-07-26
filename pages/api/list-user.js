import * as db from '../../backend/data/db';
import * as jwt from "jsonwebtoken";
import * as session from "../../backend/core/session";

export default async function listUser(req, res) {
  let auth = req.headers['authorization'].substring("Bearer ".length);
  let jwToken = jwt.decode(auth);
  let email = jwToken.email;
  let alive = await session.verify(email, auth);
  if (!alive.valid) {
    return res.status(alive.status).send({msg: alive.msg});
  }

  let users = await db.listUsers(jwToken.id);
  return res.status(200).send({ data: users });
}