import { model, Schema, Types } from 'mongoose';

interface Message {
  author: Types.ObjectId;
  content: string;
  conversation: Types.ObjectId;
}

const MessageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  content: { type: String, required: true },
  conversation: { type: Schema.Types.ObjectId, required: true, ref: 'Conversation' }
}, { timestamps: true });

const MessageModel = model<Message>('Message', MessageSchema);

export default MessageModel;