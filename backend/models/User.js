const db = require('../database/database');
const encrypt = require('../utilities/encryption');

/*
 * Add operation so use queryTransaction
 */
async function addUser(name, phone, email, studentId, username, password) {
    const hashedPW = await encrypt.hash(password);

    const cmd = 'INSERT INTO User (...)';

    try {
        let connection = await db.openConnection();
        await db.queryTransaction(cmd, connection);
        await connection.release();
    } catch(error) {
        throw {
            message: error.message
        }
    }
}

/*
 * Fetch operation so use query
 */
async function getUserById(studentId) {
    const cmd = `SELECT * FROM User WHERE studentId = ${studentId}`;

    try {
        return await db.query(cmd);
    } catch(error) {
        throw {
            message: error.message
        }
    }
}

//TODO returns user password based on username
async function getUserByUsername(username) {}

module.exports = {
    addUser,
    getUserById,
    getUserByUsername
};