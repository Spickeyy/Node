import config from 'config';
import jwt from 'jsonwebtoken';

const create = (data: AuthData) => jwt.sign(data, config.secret.jwtTokenKey);

const decode = (token: string) => jwt.decode(token) as (DecodedAuthData | null);

const TokenService = {
    create,
    decode,
} as const;

export default TokenService;
