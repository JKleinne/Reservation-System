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

async function getStudentCountPerCourse() {
    const cmd = `SELECT COUNT(s.courseId) AS Count, c.description AS Description
                 FROM sys.Student s
                 LEFT JOIN sys.Course c
                 ON s.courseId = c.courseId
                 GROUP BY s.courseId;`;

    try {
        let result = await db.query(cmd);
        return result;
    } catch(error) {
        throw {
            message: error.message
        }
    }
}

module.exports = {
    addStudent,
    getStudentById,
    getStudentCountPerCourse
};