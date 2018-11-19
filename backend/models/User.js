const db = require('../database/database');

/**
 * Add operation so use queryTransaction
 */
async function addStudent(studentID, name, email, password, courseID, notes, permission) {
    const cmd = 'INSERT INTO User (studentID, name, email, password, courseID, notes, permission)';

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

/**
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
async function getUserByUsername(username) {}

module.exports = {
    addUser,
    getUserById,
    getUserByUsername
};