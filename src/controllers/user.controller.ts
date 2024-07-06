import { Request, Response } from "express";
import log from "../utils/logger";
import { createUser } from "../services/user.service";
import { CreateUserInput } from "../schema/user.schema";
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