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

/**
* Delete operation for booking
*/
async function deleteBookingById(bookingID){
	const cmd = 'DELETE FROM Bookings WHERE bookingID = ${bookingID}';
	
	try {
		return await db.query(cmd);
	} catch(error) {
		throw{
			message: error.message
		}
	}
}

/**
* Add operation for group
*/
async function addGroup(groupName, memberIDs){
	const cmd = 'INSERT INTO Group(groupName, memberIDs)';
	
	try {
		return await db.query(cmd);
	} catch(error) {
		throw{
			message: error.message
		}
	}
}


//TODO returns user password based on username
async function getStudentByUsername(username) {}

module.exports = {
    addStudent,
    getStudentById,
    getStudentByUsername,
    deleteBookingById,
    addGroup
};