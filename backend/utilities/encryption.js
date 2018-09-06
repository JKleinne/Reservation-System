const bcrypt = require('bcrypt');
const saltRounds = 10;

/*
 * Hashes the given string and then returns it
 */
async function hash(string) {
    return await bcrypt.hash(string, saltRounds);
}

module.exports = {
    hash
};