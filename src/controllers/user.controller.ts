import { Request, Response } from "express";
import log from "../utils/logger";
import { createUser } from "../services/user.service";
import { CreateUserInput } from "../schema/user.schema";

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
  try {
    const user = await createUser(req.body);
    return res.json(user);
  } catch (e) {
    log.error(e);
    return res.sendStatus(409);
  }

}