import * as dotenv from 'dotenv';

dotenv.config();

const {
  SERVER_PORT,
  SERVER_DOMAIN,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  JWT_TOKEN_KEY,
  BCRYPT_ROUNDS,
  JWT_TOKEN_EXPIRATION,
} = process.env;

if (
  !SERVER_PORT
  || !SERVER_DOMAIN

  || !DB_HOST
  || !DB_NAME
  || !DB_USER
  || !DB_PASSWORD
  || !DB_PORT

  || !JWT_TOKEN_KEY
  || !JWT_TOKEN_EXPIRATION

  || !BCRYPT_ROUNDS
) {
  throw new Error("Please define constants in '.env' file");
}

const config = {
  server: {
    domain: SERVER_DOMAIN,
    port: SERVER_PORT,
  },

  db: {
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    port: Number(DB_PORT),
    multipleStatements: true,
  },

  jwtToken: {
    secret: JWT_TOKEN_KEY,
    expiresIn: JWT_TOKEN_EXPIRATION,
  },

  passwordEncryption: {
    secret: Number(BCRYPT_ROUNDS),
  },
};

export default config;
