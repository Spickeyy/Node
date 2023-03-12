import config from 'config';
import jwt from 'jsonwebtoken';

const create = (data: AuthData) => jwt.sign(data, config.secret.jwtTokenKey);

const decode = (token: string): DecodedAuthData | null => {
    const data = jwt.decode(token);

    if (data === null) return null;
    if (typeof data === 'string') return null;

    return {
        iat: data.iat,
        email: data.email,
    };
};

const TokenService = {
    create,
    decode,
} as const;

export default TokenService;
