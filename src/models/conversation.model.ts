import { model, Schema, Types } from 'mongoose';

interface Conversation {
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
}

const ConversationSchema = new Schema({
  participants: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }]},
  messages: { type: [{ type: Schema.Types.ObjectId, ref: 'Message' }], default: [] },
})

const ConversationModel = model<Conversation>('Conversation', ConversationSchema);

export default ConversationModel;