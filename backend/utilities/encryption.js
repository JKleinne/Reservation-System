const bcrypt = require('bcrypt');
const saltRounds = require('../config/config').encryption.saltRounds;

/*
 * Hashes the given string and then returns it
 */
async function hash(string) {
    return await bcrypt.hash(string, saltRounds);
}

module.exports = {
    hash
};