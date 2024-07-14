import { Request, Response } from "express";
import { FriendRequestInput, DeleteFriendRequestInput } from "../schema/friendRequest.schema";
import { createFriendRequest, listFriendRequests, deleteFriendRequest, findFriendRequest } from "../services/friendRequest.service";
import { addFriend } from "../services/user.service";
import log from "../utils/logger";

export const createFriendRequestHandler = async (req: Request<{}, {}, FriendRequestInput['body']>, res: Response) => {
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

export const deleteFriendRequestHandler = async (req: Request<DeleteFriendRequestInput['params']>, res: Response) => {
  try {
    const from = res.locals.user.sub as string;
    const requestId = req.params.requestId;

    const deleteResult = await deleteFriendRequest(from, requestId);

    if(!deleteResult) return res.status(400).json({ msg: "cannot delete friend request" });

    return res.json({ msg: "friend request deleted" });
  } catch (e) {
    log.error(e);
    return res.status(400).json({ msg: "cannot delete friend request" });
  }
}

export const acceptFriendRequestHandler = async (req: Request<DeleteFriendRequestInput['params']>, res: Response) => {
  try {
    const to = res.locals.user.sub as string;
    const requestId = req.params.requestId;

    const friendRequest = await findFriendRequest(requestId);

    if(!friendRequest) return res.status(404).json({ msg: "cannot find friend request" });
    if(friendRequest.to.toString() !== to) return res.status(403).json({ msg: "forbidden" });

    const from = friendRequest.from.toString();

    await Promise.all([
      addFriend(from, to),
      addFriend(to, from),
      deleteFriendRequest(from, requestId)
    ]);

    return res.json({ msg: "friend request accepted" });
  } catch (e) {
    log.error(e);
    return res.status(400).json({ msg: "cannot accept friend request" });
  }
}

export const rejectFriendRequestHandler = async (req: Request<DeleteFriendRequestInput['params']>, res: Response) => {
  try {
    const to = res.locals.user.sub as string;
    const requestId = req.params.requestId;

    const friendRequest = await findFriendRequest(requestId);

    if(!friendRequest) return res.status(404).json({ msg: "cannot find friend request" });
    if(friendRequest.to.toString() !== to) return res.status(403).json({ msg: "forbidden" });

    const from = friendRequest.from.toString();

    await deleteFriendRequest(from, requestId);

    return res.json({ msg: "friend request rejected" });
  } catch (e) {
    log.error(e);
    return res.status(400).json({ msg: "cannot reject friend request" });
  }
}
