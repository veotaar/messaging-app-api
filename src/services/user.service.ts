import UserModel from "../models/user.model";
import mongoose from "mongoose";
import { createConversation, sendMessage } from "./conversation.service";
import { ENV } from '../../env';

const defaultFriendEmail = ENV.DEFAULT_FRIEND_EMAIL;
const defaultWelcomeMessage = ENV.WELCOME_MESSAGE;

interface CreateUserInput {
  email: string;
  username: string;
  password: string;
}

export const validateUserPassword = async ({
  email,
  password
}: {
  email: string;
  password: string
}) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) return false;

    const isValid = await Bun.password.verify(password, user.password);

    if (!isValid) return false;

    return user;
  } catch(e: any) {
    throw new Error(e);
  }
}

export const findUser = async (userId: string) => {
  try {
    const user = await UserModel.findById(userId).select('-password');

    if (!user) return false;

    return user;
  } catch (e: any) {
    throw new Error(e);
  }
}

export const addFriend = async (userId: string, friendId: string) => {
  try {
    const user = await findUser(userId);

    if(!user) return false;

    user.friends.push(new mongoose.Types.ObjectId(friendId));

    return await user.save();
  } catch(e: any) {
    throw new Error(e);
  }
}

export const createUser = async (input: CreateUserInput) => {
  try {
    const hashedPassword = await Bun.password.hash(input.password);

    const user = await UserModel.create({
      ...input,
      password: hashedPassword
    });

    const defaultFriend = await UserModel.findOne({ email: defaultFriendEmail });

    if (defaultFriend) {
      await addFriend(user._id.toString(), defaultFriend._id.toString());
      await addFriend(defaultFriend._id.toString(), user._id.toString());
      const conv = await createConversation(defaultFriend._id.toString(), user._id.toString() );
      if (conv) {
        await sendMessage(defaultFriend._id.toString(), defaultWelcomeMessage, conv._id.toString());
      }
    }

    return user;
  } catch(e: any) {
    throw new Error(e);
  }
}


export const listFriends =  async (userId: string) => {
  try {
    const user = await UserModel.findById(userId).select('-password').populate('friends', 'username');

    if(!user) return false;

    return user.friends;
  } catch(e: any) {
    throw new Error(e);
  }
}

export const findUserWithEmail = async (email: string) => {
  try {
    const user =  await UserModel.findOne({ email }).select('_id email username');

    if(!user) return false;

    return user;
  } catch(e: any) {
    throw new Error(e);
  }
}