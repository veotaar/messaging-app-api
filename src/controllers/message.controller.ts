import { Request, Response } from "express";
import log from "../utils/logger";
import { getMessages } from "../services/message.service";
import { GetMessagesInput } from "../schema/message.schema";

export const getMessagesHandler = async (req: Request<GetMessagesInput['params'], {}, {}, GetMessagesInput['query']>, res: Response) => {
  try {
    const userIdFromToken = res.locals.user.sub as string;
    const { conversationId } = req.params;
    const { page } = req.query;

    const messagesData = await getMessages(conversationId, userIdFromToken, Number(page));

    if(!messagesData) return res.status(400).json({ msg: "cannot get messages" });

    return res.json({ messagesData });
  } catch (e) {
    log.error(e);
    return res.status(400).json({ msg: "cannot get messages" });
  }
}