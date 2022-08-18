const bcrypt = require('bcrypt')

const generateHashPassword = async (password) => {
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword
}

function replaceSpaces(str) {
    return str.replace(/\s+/g, '-').toLowerCase();
}

module.exports = {
    generateHashPassword,
    replaceSpaces
}