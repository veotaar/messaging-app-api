import MessageModel from "../models/message.model";
import ConversationModel from "../models/conversation.model";
import { Types } from "mongoose";

export const getMessages = async (conversationId: string, userId: string, page: number) => {
  try {

    if(page < -1 || page === 0) return false;

    const limit = 20

    const conversation = await ConversationModel.findById(conversationId);

    if(!conversation) return false;
    if(!conversation.participants.includes(new Types.ObjectId(userId))) return false;


    const query = { conversation: conversationId };

    const count = await MessageModel.countDocuments(query);
    const pages = Math.ceil(count / limit); // last page

    if(count === 0) {
      return {
        currentPage: 1,
        hasNextPage: false,
        nextPage: null,
        hasPreviousPage: false,
        previousPage: null,
        messages: []
      }
    }

    if(page > pages) return false;

    let pageToGet = page === -1 ? pages : page;

    const messages = await MessageModel.find({ conversation: conversationId })
      .sort('createdAt')
      .skip((pageToGet - 1) * limit)
      .limit(limit)
      .populate('author', 'username');

    const hasNextPage = pageToGet < pages;
    const nextPage = hasNextPage ? pageToGet + 1 : null;
    const hasPreviousPage = pageToGet > 1;
    const previousPage = hasPreviousPage ? pageToGet - 1 : null;

    return {
      currentPage: pageToGet,
      hasNextPage,
      nextPage,
      hasPreviousPage,
      previousPage,
      messages: messages
    }

    // return messages;
  } catch (e: any) {
    throw new Error(e);
  }
}
