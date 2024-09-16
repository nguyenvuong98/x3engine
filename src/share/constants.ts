export enum DbModel {
    USER = 'User'
}

export const saltRounds = process.env.SALT_OR_ROUNDS

export const ACCESS_TOKEN_HEADER_NAME = 'access-token';
export const USER_PAYLOAD_HEADER_NAME = 'user-payload';
export const USER_DETAIL_HEADER_NAME = 'user';