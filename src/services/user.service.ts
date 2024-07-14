import UserModel from "../models/user.model";
import { hashPassword, verifyPassword } from "../utils/password.utils";
import mongoose from "mongoose";

interface CreateUserInput {
  email: string;
  username: string;
  password: string;
}

export const createUser = async (input: CreateUserInput) => {
  try {
    const hashedPassword = await hashPassword(input.password);

    const user = await UserModel.create({
      ...input,
      password: hashedPassword
    });
    return user;
  } catch(e: any) {
    throw new Error(e);
  }
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

    const isValid = await verifyPassword(user.password, password);

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

export const listFriends =  async (userId: string) => {
  try {
    const user = await UserModel.findById(userId).select('-password').populate('friends', 'username');

    if(!user) return false;

    return user.friends;
  } catch(e: any) {
    throw new Error(e);
  }
}