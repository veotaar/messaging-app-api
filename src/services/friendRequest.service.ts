import FriendRequestModel from "../models/friendRequest.model";
import UserModel from "../models/user.model";

interface FriendRequestInput {
  from: string;
  to: string;
}

export const createFriendRequest = async (input: FriendRequestInput) => {
  try {
    const friendToAdd = await UserModel.findById(input.to);
    if(!friendToAdd) return false;

    const exists = await FriendRequestModel.find(input);
    if(exists.length !== 0) return false;

    const friendRequest = new FriendRequestModel(input);
    return await friendRequest.save();
  } catch(e: any) {
    throw new Error(e);
  }
}

export const listFriendRequests = async (userId: string) => {
  try {
    const sentRequests = await FriendRequestModel.find({ from: userId }).select('-from').populate('to', 'username');
    const receivedRequests = await FriendRequestModel.find({ to: userId }).select('-to').populate('from', 'username');

    return {
      sent: sentRequests,
      received: receivedRequests
    }
  } catch(e: any) {
    throw new Error(e);
  }
}