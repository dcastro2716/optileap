import * as pg from 'pg'
import bcrypt from 'bcrypt';

const { Pool } = pg

const pool = new Pool({
    user: 'optileap',
    host: 'localhost',
    database: 'optileap',
    password: 'Fpro4nftrt..3234D4dgs4F5tfv.4Degtg',
    port: 5432,
})

module.exports = {
    async findAccount(email) {
        const client = await pool.connect();
        try {
            const queryText = 'select id, names, last_names, password, email, last_login from accounts where email = $1';
            const res = await client.query(queryText, [email]);
            if (res.rows.length < 1) return null;
            return {
                id: res.rows[0].id,
                names: res.rows[0].names,
                password: res.rows[0].password,
                lastNames: res.rows[0].last_names,
                email: res.rows[0].email,
                lastLogin: res.rows[0].last_login,
            };
        } finally {
            client.release();
        }
    },

    async registerUser(names, lastNames, email, password) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const b = await bcrypt.hashSync(password, 10);
            const queryText = 'INSERT INTO accounts(names, last_names, password, email, created_on, modified_on, last_login) VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id';
            const res = await client.query(queryText, [names, lastNames, b, email])
            await client.query('COMMIT');
            return {
                id: res.rows[0].id,
                names: names,
                lastNames: lastNames,
                email: email,
            };
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release();
        }
    },

    async createUser(names, lastNames, email, weight, height, affiliation, birth, sex, accountId) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const queryText = 'INSERT INTO users(names, last_names, email, weight, height, affiliation, birth, sex, account_id, created_on, modified_on) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id';
            const res = await client.query(queryText, [names, lastNames, email, weight, height, affiliation, birth, sex, accountId]);
            await client.query('COMMIT');
            return {
                id: res.rows[0].id,
            };
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release();
        }
    },

    async listUsers(accountId) {
        const client = await pool.connect();
        try {
            const queryText = 'select u.id, u.names, u.last_names, u.email, u.weight, u.height, u.affiliation, u.birth, u.sex  from users u, accounts a where a.id = $1 order by u.id';
            const res = await client.query(queryText, [accountId]);
            if (res.rows.length < 1) return null;
            let users = [];
            for (let i = 0; i < res.rows.length ; i++) {
                users.push({
                    id: res.rows[i].id,
                    names: res.rows[i].names,
                    lastNames: res.rows[i].last_names,
                    email: res.rows[i].email,
                    weight: res.rows[i].weight,
                    height: res.rows[i].height,
                    affiliation: res.rows[i].affiliation,
                    birth: res.rows[i].birth,
                    sex: res.rows[i].sex,
                });
            }
            return users;
        } finally {
            client.release();
        }
    },

    async deleteUser(userId, accountId) {
        const client = await pool.connect();
        try {
            const queryText = 'delete from users using accounts where accounts.id = users.account_id and users.id = $1 and accounts.id=$2';
            const res = await client.query(queryText, [userId, accountId]);
            return {
                count: res.rowCount,
            };
        } finally {
            client.release();
        }
    },

    async findUser(userId, accountId) {
        const client = await pool.connect();
        try {
            const queryText = 'select u.id, u.names, u.last_names, u.email, u.weight, u.height, u.affiliation, u.birth, u.sex  from users u, accounts a where a.id = $1 and u.id = $2';
            const res = await client.query(queryText, [accountId, userId]);
            if (res.rows.length < 1) return null;
            return {
                id: res.rows[0].id,
                names: res.rows[0].names,
                lastNames: res.rows[0].last_names,
                email: res.rows[0].email,
                weight: res.rows[0].weight,
                height: res.rows[0].height,
                affiliation: res.rows[0].affiliation,
                birth: res.rows[0].birth,
                sex: res.rows[0].sex,
            };
        } finally {
            client.release();
        }
    },

    async saveEvaluation(names, lastNames, email, weight, height, affiliation, birth, sex, time, jump, userId, accountId) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const queryText = 'INSERT INTO evaluations(names, last_names, email, weight, height, affiliation, birth, sex, jump_time, jump_height, user_id, account_id, created_on, modified_on) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id';
            const res = await client.query(queryText, [names, lastNames, email, weight, height, affiliation, birth, sex, time, jump, userId, accountId]);
            await client.query('COMMIT');
            return {
                id: res.rows[0].id,
            };
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release();
        }
    },

    async listEvaluations(userId, accountId) {
        const client = await pool.connect();
        try {
            const queryText = 'select e.id, e.names, e.last_names, e.email, e.weight, e.height, e.affiliation, e.birth, e.sex, e.jump_time, e.jump_height, e.created_on at time zone \'utc\' at time zone \'america/lima\' as jump_date  from evaluations e where e.user_id = $1 and e.account_id = $2 order by e.id';
            const res = await client.query(queryText, [userId, accountId]);
            if (res.rows.length < 1) return null;
            let evaluations = [];
            for (let i = 0; i < res.rows.length ; i++) {
                evaluations.push({
                    id: res.rows[i].id,
                    names: res.rows[i].names,
                    lastNames: res.rows[i].last_names,
                    email: res.rows[i].email,
                    weight: res.rows[i].weight,
                    height: res.rows[i].height,
                    affiliation: res.rows[i].affiliation,
                    birth: res.rows[i].birth,
                    sex: res.rows[i].sex,
                    time: res.rows[i].jump_time,
                    jump: res.rows[i].jump_height,
                    date: res.rows[i].jump_date,
                });
            }
            return evaluations;
        } finally {
            client.release();
        }
    },
};