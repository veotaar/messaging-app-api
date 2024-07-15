import { Request, Response } from "express";
import log from "../utils/logger";
import { CreateConversationInput } from "../schema/conversation.schema";
import { createConversation } from "../services/conversation.service";

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
