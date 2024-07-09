import { Request, Response } from "express";
import log from "../utils/logger";
import { createUser, validateUserPassword } from "../services/user.service";
import { CreateUserInput, LoginInput } from "../schema/user.schema";
import { issueJwt } from "../utils/jwt.utils";

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
  try {
    const user = await createUser(req.body);
    const jwt = issueJwt(user);
    return res.json({
      user,
      jwt
    });
  } catch (e) {
    log.error(e);
    return res.sendStatus(409);
  }
}

export const loginHandler = async (req: Request<{}, {}, LoginInput['body']>, res: Response) => {
  try {
    const user = await validateUserPassword(req.body);

    if(!user) return res.status(401).json({ msg: "wrong username or password" });

    const jwt = issueJwt(user);

    return res.json({
      user,
      jwt
    });
  } catch (e) {
    log.error(e);
    return res.sendStatus(400);
  }
}