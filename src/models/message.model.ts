import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { User } from './user.model';

export class Message extends TimeStamps {
  @prop({ ref: () => User })
  public author!: Ref<User>;

  @prop({ type: () => String })
  public content!: string;

}

const MessageModel = getModelForClass(Message);

export default MessageModel;