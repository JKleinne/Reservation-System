const db = require('../database/database');

/*
 * Add operation so use queryTransaction
 */
async function addUser(name, phone, email, studentId) {
    const cmd = 'INSERT INTO User (...)';

    try {
        let connection = await db.openConnection();
        await db.queryTransaction(cmd, connection);
        connection.release();
    } catch(error) {
        console.error(error);
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
        console.error(error);
    }
}

module.exports = {
    addUser,
    getUserById
};