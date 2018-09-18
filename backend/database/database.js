const mysql = require('mysql');
const db = require('../config/config').mysql;

/**
 * Creates a pool of connection
 * @type {Pool}
 */
const pool = mysql.createPool({
		  connectionLimit: require('../config/config').cLimit,
		  host: db.host,
		  user: db.user,
		  password: db.password,
		  database: db.database
		});

/**
 * Returns a connection from the pool
 * @returns {Promise<void>}
 */
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

/**
 * Query function, use only for fetch operations
 * @param cmd SQL command
 * @returns {Promise<void>}
 */
async function query(cmd) {
    try {
        let result = await pool.query(cmd);
        return result;
    } catch(error) {
        throw {
            message: error.message
        }
    }
}

/**
 * Query function, use for any operations
 * @param cmd SQL command
 * @param connection A connection to the database
 * @returns {Promise<void>}
 */
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