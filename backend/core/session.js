let NodeCache = require( "node-cache" );

let sessions = new NodeCache( { stdTTL: 5 * 60 } );

module.exports = {
  async save(session) {
    sessions.set(session.email, session);
  },

  async find(email) {
    return await sessions.get(email);
  },

  async delete(email) {
    return sessions.del(email);
  },

  async verify(email, auth) {
    return {valid: true};
    /*
    let cache = await this.find(email);
    if(!cache) {
      return {status: 401, msg: 'Sesión terminada', valid: false};
    }
    if(cache.token !== auth) {
      return {status: 401, msg: 'Sesión inválida', valid: false};
    }
     */
  }
}