import * as bcrypt from 'bcrypt';

export const jwtSecret = process.env.JWT_SECRET
export const jwtExpireTime = process.env.JWT_EXPIRE_TIME || 86400

export const ComparePassword = async (inputPw, hashPw) => {
    const isMatch = await bcrypt.compare(inputPw, hashPw);

    return isMatch
}