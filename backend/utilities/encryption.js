const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hash(string) {
    return await bcrypt.hash(string, saltRounds);
}

module.exports = {
    hash
};