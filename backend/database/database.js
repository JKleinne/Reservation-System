const mysql = require('mysql');
const db = require('../config/config').mysql;

const pool = mysql.createPool({
    connectionLimit: 10,
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
});

pool.getConnection((err, connection) => {
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }

        if(err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections');
        }

        if(err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused');
        }
    }

    if(connection) connection.release();
});

async function query(cmd) {
    await pool.connect();

    try {
        let {err, result, fields} = await pool.query(cmd);

        if(err) throw err;

        return result;
    } catch(error) {
        console.error(error);
    }
}

async function queryTransaction(cmd, connection) {
    try {
        await connection.beginTransaction();
        await connection.query(cmd);
        await connection.commit();
    } catch(error) {
        await connection.rollback();
        console.err(error);
    }
}

module.exports = {
    query,
    queryTransaction,
    pool
};