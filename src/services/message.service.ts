import MessageModel from "../models/message.model";
import ConversationModel from "../models/conversation.model";
import { Types } from "mongoose";

export const getMessages = async (conversationId: string, userId: string, page: number, limit: number) => {
  try {

    const conversation = await ConversationModel.findById(conversationId);

    if(!conversation) return false;
    if(!conversation.participants.includes(new Types.ObjectId(userId))) return false;

    const query = { conversation: conversationId };

    const countPromise = MessageModel.countDocuments(query);
    const messagesPromise = MessageModel.find({ conversation: conversationId })
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'username');

    const [count, messages] = await Promise.all([countPromise, messagesPromise]);

    const pages = Math.ceil(count / limit);
    const hasNextPage = page < pages;
    const nextPage = hasNextPage ? page + 1 : null;

    return {
      currentPage: page,
      hasNextPage,
      nextPage,
      messages: messages.reverse()
    }

    // return messages;
  } catch (e: any) {
    throw new Error(e);
  }
}