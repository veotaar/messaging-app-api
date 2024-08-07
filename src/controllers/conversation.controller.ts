import { Request, Response } from "express";
import log from "../utils/logger";
import { CreateConversationInput, ConversationsInput, CreateMessageInput, GetConversationInput } from "../schema/conversation.schema";
import { createConversation, listConversations, sendMessage, getConversation } from "../services/conversation.service";

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
    return res.status(400).json({ msg: "cannot list conversations" });
  }
}

export const sendMessageHandler = async (req: Request<CreateMessageInput['params'], {}, CreateMessageInput['body']>, res: Response) => {
  try {
    const userIdFromToken = res.locals.user.sub as string;
    const { conversationId } = req.params;
    const { content } = req.body;

    const newMessage = await sendMessage(userIdFromToken, content, conversationId);

    return res.json({ newMessage });
  } catch (e) {
    log.error(e);
    return res.status(400).json({ msg: "cannot send message" });
  }
}

export const getConversationHandler = async (req: Request<GetConversationInput['params']>, res: Response) => {
  try {
    const userIdFromToken = res.locals.user.sub as string;
    const { conversationId } = req.params;

    const conversation = await getConversation(userIdFromToken, conversationId);

    if(!conversation) return res.status(400).json({ msg: "cannot get conversation" });

    return res.json({ conversation });
  } catch (e) {
    log.error(e);
    return res.status(400).json({ msg: "cannot get conversation" });
  }
}