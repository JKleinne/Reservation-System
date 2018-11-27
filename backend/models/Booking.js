const db = require('../database/database');

async function getBookings() {
    const cmd = 'SELECT * FROM Booking';

    try {
        let result = await db.query(cmd);
        return result;
    } catch(error) {
        throw {
            message: error
        }
    }
}

async function getBookingsByStudentId(studentId) {
    const cmd = `SELECT * FROM Booking WHERE members LIKE '%${studentId}%'`;

    try {
        let result = await db.query(cmd);
        return result[0];
    } catch(error) {
        throw {
            message: error
        }
    }
}

async function getBookingsByMonth(month) {
    const cmd = `SELECT * FROM Booking WHERE MONTH(date) = ${parseInt(month)}`;

    try {
        let result = await db.query(cmd);
        return result;
    } catch(error) {
        throw {
            message: error
        }
    }
}

module.exports = {
    getBookings,
    getBookingsByStudentId,
    getBookingsByMonth
};