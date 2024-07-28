import { Request, Response } from "express";
import log from "../utils/logger";
import { createUser, validateUserPassword, listFriends, findUserWithEmail } from "../services/user.service";
import { CreateUserInput, LoginInput, FriendsInput, SearchEmailInput } from "../schema/user.schema";
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

export const listFriendsHandler = async (req: Request<FriendsInput['params']>, res: Response) => {
  try {
    const userId = req.params.userId;
    const userIdFromToken = res.locals.user.sub as string;

    if(userId !== userIdFromToken) return res.status(403).json({ msg: "forbidden" });

    const friends = await listFriends(userId);

    return res.json({
      friends
    });
  } catch(e) {
    log.error(e);
    return res.sendStatus(400);
  }
}

export const findUserWithEmailHandler = async (req: Request<{}, {}, {}, SearchEmailInput['query']>, res: Response) => {
  try {
    const emailToSearch = req.query.email;
    const user = await findUserWithEmail(emailToSearch);

    if(!user) return res.status(404).json({ msg: "user not found" });

    return res.json({ user });
  } catch(e) {
    log.error(e);
    return res.sendStatus(400);
  }
}