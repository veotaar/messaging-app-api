import { Request, Response } from "express";
import log from "../utils/logger";
import { CreateConversationInput, ConversationsInput } from "../schema/conversation.schema";
import { createConversation, listConversations } from "../services/conversation.service";

export const createConversationHandler = async (req: Request<CreateConversationInput['params']>, res: Response) => {
  try {
    const initiator = res.locals.user.sub as string;
    const { initiatorId, recipientId } = req.params;

    if(initiator !== initiatorId) return res.status(400).json({ msg: "cannot create conversation" });

    const conversation = await createConversation(initiatorId, recipientId);

    if(!conversation) return res.status(400).json({ msg: "cannot create conversation" });

    return res.json({conversation});
  } catch (e) {
    log.error(e);
    return res.status(400).json({ msg: "cannot create conversation" });
  }
}

export const listConversationsHandler = async (req: Request<ConversationsInput['params']>, res: Response) => {
  try {
    const userIdFromToken = res.locals.user.sub as string;
    const userId = req.params.userId;

    if(userIdFromToken !== userId) return res.status(400).json({ msg: "cannot list conversations" });

    const conversations = await listConversations(userId);

    return res.json({conversations});
  } catch (e) {
    log.error(e);
    return res.status(400).json({ msg: "cannot list conversations" })
  }
}