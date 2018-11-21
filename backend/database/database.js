const mysql = require('mysql');
const db = require('../config/config').mysql;
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: require('../config/config').cLimit,
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
});

pool.query = util.promisify(pool.query);

async function query(cmd) {
	try {
		let result = await pool.query(cmd);
		return result;
	} catch(error) {
		console.error(error);
	}
}

module.exports = {
    query
};