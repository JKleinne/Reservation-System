const db = require('../database/database');

/**
 * Add operation so use queryTransaction
 */
async function addStudent(studentID, password, name, courseID) {
    const cmd = `INSERT INTO Student (studentId, name, password, courseId)
                 VALUES ("${studentID}", "${name}", "${password}", ${courseID ? courseID : 0})`;

    try {
        await db.query(cmd);
    } catch(error) {
        throw {
            message: error.message
        }
    }
}

/**
 * Fetch operation so use query
 */
async function getStudentById(studentId) {
    const cmd = `SELECT * FROM Student WHERE studentId = "${studentId}"`;

    try {
        let result = await db.query(cmd);
        return result[0];
    } catch(error) {
        throw {
            message: error.message
        }
    }
}

module.exports = {
    addStudent,
    getStudentById
};