import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';

const publicKey = Buffer.from(
  config.get<string>('publicKey'),
  'base64'
).toString('ascii');

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if(!req.headers.authorization) return res.status(401).json({ msg: 'You are unauthorized.' });

  const authorizationHeaderParts = req.headers.authorization.split(' ')

  const isValidAuthHeader = authorizationHeaderParts[0] === 'Bearer' && authorizationHeaderParts[1].match(/\S+\.\S+\.\S+/) !== null;

  if(!isValidAuthHeader) return res.status(401).json({ msg: 'You are unauthorized.' });

  try {
    const decoded = jwt.verify(authorizationHeaderParts[1], publicKey, { algorithms: ['RS256'] });
    res.locals.user = decoded;
    return next();
  } catch (_e: any) {
    return res.status(401).json({ msg: 'You are unauthorized.' });
  }
}

export default requireAuth;