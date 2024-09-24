import ConversationModel from "../models/conversation.model";
import MessageModel from "../models/message.model";
import { findUser } from "./user.service";
import { Types } from "mongoose";

export const findConversationByParticipants = async (firstParticipant: string, secondParticipant: string) => {
  try {
    const conversation = await ConversationModel.findOne({ participants: { $size: 2, $all: [new Types.ObjectId(firstParticipant), new Types.ObjectId(secondParticipant)] }});

    if(!conversation) return false;

    return conversation;
  } catch (e: any) {
    throw new Error(e);
  }
}

export const createConversation = async (initiatorId: string, recipiantId: string) => {
  try {
    const [initiator, recipiant] = await Promise.all([
      findUser(initiatorId),
      findUser(recipiantId)
    ]);

    if(!initiator || !recipiant) return false;

    const exists = await findConversationByParticipants(initiatorId, recipiantId);

    if(exists) return exists;

    const isFriends = initiator.friends.includes(new Types.ObjectId(recipiantId))
      && recipiant.friends.includes(new Types.ObjectId(initiatorId));

    if(!isFriends) return false;

    const conversation = await ConversationModel.create({
      initiator: initiator._id,
      participants: [
        initiator._id, recipiant._id
      ]
    });

    return conversation;
  } catch (e: any) {
    throw new Error(e);
  }
}

export const listConversations = async (userId: string) => {
  try {
    const conversations = await ConversationModel.find({
      $or: [
        { initiator: userId },
        { participants: userId },
        // { participants: userId, messages: { $exists: true, $not: { $size: 0 } } }
      ]
    }).select('-messages').populate('participants', 'username');

    return conversations;
  } catch (e: any) {
    throw new Error(e);
  }
}

export const sendMessage = async (userId: string, content: string, conversationId: string) => {
  try {
    const message = await MessageModel.create({
      author: new Types.ObjectId(userId),
      content: content,
      conversation: conversationId
    });

    // await ConversationModel.findByIdAndUpdate(conversationId, {
    //   $push: { messages: message._id }
    // });

    return message;
  } catch (e: any) {
    throw new Error(e);
  }
}

export const getConversation = async (userId: string, conversationId: string) => {
  try {
    const conversation = await ConversationModel.findById(conversationId).populate('messages');

    if(!conversation) return false;
    if(!conversation.participants.includes(new Types.ObjectId(userId))) return false;

    return conversation;
  } catch (e: any) {
    throw new Error(e);
  }
}