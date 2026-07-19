import bcrypt from 'bcryptjs'
import { ENV } from '../config/env.js'

const hashPassword = async (password) => {
  return bcrypt.hash(password, ENV.BCRYPT_SALT_ROUNDS)
}

const comparePassword = async (plain, hashed) => {
  return bcrypt.compare(plain, hashed)
}

export { hashPassword, comparePassword }