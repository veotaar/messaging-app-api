import MessageModel from "../models/message.model";
import ConversationModel from "../models/conversation.model";
import { Types } from "mongoose";

export const getMessages = async (conversationId: string, userId: string, cursor?: string) => {
  try {
    const limit = 20

    const conversation = await ConversationModel.findById(conversationId);

    if(!conversation) return false;
    if(!conversation.participants.includes(new Types.ObjectId(userId))) return false;

    type MessageQuery = {
      conversation: string;
      _id?: {
        $lt: string;
      };
    }

    const query: MessageQuery = { conversation: conversationId };

    if(cursor) {
      query['_id'] = { $lt: cursor }
    }

    const messages = await MessageModel.find(query)
      .lean()
      .sort('-createdAt')
      .limit(limit)
      .populate('author', 'username');

    const newCursor = messages.length > 1 ? messages[messages.length - 1]._id.toString() : null;

    return {
      cursor: newCursor,
      messages: messages.reverse()
    }

    // return messages;
  } catch (e: any) {
    throw new Error(e);
  }
}
