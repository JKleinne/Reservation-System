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
                if (error.code === 'PROTOCOL_CONNECTION_LOST') {
                    throw {
                        message: 'Database connection was closed.'
                    }
                }

                if (error.code === 'ER_CON_COUNT_ERROR') {
                    throw {
                        message: 'Database has too many connections'
                    }
                }

                if (error.code === 'ECONNREFUSED') {
                    throw {
                        message: 'Database has too many connections'
                    }
                }
    }
}

async function query(cmd) {
    await pool.connect();

    try {
        let result = await pool.query(cmd);
        return result;
    } catch(error) {
        throw {
            message: error.message
        }
    }
}

async function queryTransaction(cmd, connection) {
    try {
        await connection.beginTransaction();
        await connection.query(cmd);
        await connection.commit();
    } catch(error) {
        await connection.rollback();
        throw {
            message: error.message
        }
    }
}

module.exports = {
    query,
    queryTransaction,
    openConnection
};