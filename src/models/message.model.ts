import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { User } from './user.model';
import { Conversation } from './conversation.model';

export class Message extends TimeStamps {
  @prop({ ref: () => User })
  public author!: Ref<User>;

  @prop({ type: () => String })
  public content!: string;

  @prop({ ref: () => Conversation })
  public conversation!: Ref<Conversation>;
}

const MessageModel = getModelForClass(Message);

export default MessageModel;