const db = require('../database/database');

async function addAdmin(id, name, password, twoFAsecret) {
    const cmd = `INSERT INTO Admins (id, name, password, twoFAsecret)
                 VALUES ('${id}', '${name}', '${password}', '${twoFAsecret}')`;

    try {
        await db.query(cmd);
    } catch(error) {
        throw {
            message: error
        }
    }
}

async function getAdmin(id) {
    const cmd = `SELECT * FROM Admins WHERE id = '${id}'`;

    try {
        let result = await db.query(cmd);
        return result[0];
    } catch(error) {
        throw {
            message: error
        }
    }
}

async function getAllAdmins() {
    const cmd = `SELECT * FROM Admins`;

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
    addAdmin,
    getAdmin,
    getAllAdmins
};