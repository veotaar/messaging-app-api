import { Request, Response } from "express";
import { friendRequestInput } from "../schema/friendRequest.schema";
import { createFriendRequest, listFriendRequests } from "../services/friendRequest.service";
import log from "../utils/logger";

export const createFriendRequestHandler = async (req: Request<{}, {}, friendRequestInput['body']>, res: Response) => {
  try {
    const from = res.locals.user.sub as string;

    const friendRequest = await createFriendRequest({
      from,
      to: req.body.to
    })

    if(!friendRequest) return res.status(400).json({ msg: "cannot send friend request" });

    return res.json({
      friendRequest
    });

  } catch (e) {
    log.error(e);
    return res.status(400).json({ msg: "cannot send friend request" });
  }
}

export const listFriendRequestsHandler = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.sub as string;

    const friendRequests = await listFriendRequests(userId);

    return res.json(friendRequests);

  } catch (e) {
    log.error(e);
    return res.status(400).json({ msg: "cannot list friend requests" });
  }
}