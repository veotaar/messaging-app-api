import { model, Schema, Types } from 'mongoose';

interface FriendRequest {
  from: Types.ObjectId;
  to: Types.ObjectId;
}

const FriendRequestSchema = new Schema({
  from: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  to: { type: Schema.Types.ObjectId, required: true, ref: 'User' }

})

const FriendRequestModel = model<FriendRequest>('FriendRequest', FriendRequestSchema);

export default FriendRequestModel;