import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { User } from './user.model';
import { Message } from './message.model';

export class Conversation extends TimeStamps {
  @prop({ ref: () => User })
  public participants!: Ref<User>[];

  @prop({ ref: () => Message })
  public messages?: Ref<Message>[];

}

const ConversationModel = getModelForClass(Conversation);

export default ConversationModel;