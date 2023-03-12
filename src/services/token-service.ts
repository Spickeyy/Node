import config from 'config';
import jwt from 'jsonwebtoken';

type HashedData = {
    email: UserEntity['email'],
    role: UserEntity['role'],
    iat: number,
};

const create = (data: HashedData) => jwt.sign(data, config.secret.jwtTokenKey);

const decode = (token: string) => jwt.decode(token) as (HashedData | null);

const TokenService = {
    create,
    decode,
} as const;

export default TokenService;
