import { genSalt, hash } from 'bcrypt'

export const generateHashPassword = async (password) => {
    const salt = await genSalt()
    const hashPassword = await hash(password, salt)
    return hashPassword
}

export function replaceSpaces(str) {
    return str.replace(/\s+/g, '-').toLowerCase();
}