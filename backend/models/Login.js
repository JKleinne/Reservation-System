const db = require('../database/database');

async function addLogin(date, studentId) {
    const cmd = `INSERT INTO Logins (date, studentId) 
                 VALUES ('${date}', '${studentId}')`;

    try {
        await db.query(cmd)
    } catch(error) {
        throw {
            message: error
        }
    }
}

async function getLoginsByStudentId(studentId) {
    const cmd = `SELECT * FROM Login WHERE studentId = '${studentId}'`;

    try {
        let result = await db.query(cmd);
        return result[0];
    } catch(error) {
        throw {
            message: error
        }
    }
}

async function getLoginsByDate(date) {
    const cmd = `SELECT COUNT(*) AS Count FROM Logins WHERE date LIKE '${date}%'`;

    try {
        let result = await db.query(cmd);
        console.log(`Result: ${result}`);
        return result;
    } catch(error) {
        throw {
            message: error
        }
    }
}

module.exports = {
    addLogin,
    getLoginsByStudentId,
    getLoginsByDate
};