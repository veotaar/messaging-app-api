import { model, Schema, Types } from 'mongoose';

export interface User {
  email: string;
  username: string;
  password: string;
  friends: Types.ObjectId[];
}

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: [] }
}, { timestamps: true });

const UserModel = model<User>('User', UserSchema);

export default UserModel;