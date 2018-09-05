const mysql = require('mysql');
const db = require('../config/config').mysql;

const pool = mysql.createPool({
    connectionLimit: 10,
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
});

async function openConnection() {
    try {
        let connection = await pool.getConnection();
        return connection;
    } catch(error) {
            if (error) {
                if (error.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }

                if (error.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections');
                }

                if (error.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused');
                }
            }
    }
}

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
        console.error(error);
    }
}

module.exports = {
    query,
    queryTransaction,
    pool,
    openConnection
};