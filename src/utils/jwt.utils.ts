import jwt from 'jsonwebtoken';
import config from 'config';
import { User } from '../models/user.model';
import { HydratedDocument } from 'mongoose';

const privateKey = Buffer.from(
  config.get<string>('privateKey'),
  'base64'
).toString('ascii');

const publicKey = Buffer.from(
  config.get<string>('publicKey'),
  'base64'
).toString('ascii');

export const issueJwt = (user: HydratedDocument<User>) => {
  const id = user._id.toString();
  const expiresIn = '8h';

  const payload = {
    sub: id,
    iat: Math.floor(Date.now() / 1000)
  };

  const token = jwt.sign(payload, privateKey, {
    expiresIn,
    algorithm: 'RS256'
  });

  return {
    token: `Bearer ${token}`,
    expires: payload.iat + (8 * 60 * 60)
  };
};