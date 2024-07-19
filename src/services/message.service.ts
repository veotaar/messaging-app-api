import MessageModel from "../models/message.model";
import ConversationModel from "../models/conversation.model";
import { Types } from "mongoose";

export const getMessages = async (conversationId: string, userId: string, page: number, limit: number) => {
  try {

    const conversation = await ConversationModel.findById(conversationId).populate('messages');

    if(!conversation) return false;
    if(!conversation.participants.includes(new Types.ObjectId(userId))) return false;

    const messages = await MessageModel.find({ conversation: conversationId })
      .sort('-createdAt')
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    return messages;
  } catch (e: any) {
    throw new Error(e);
  }
}