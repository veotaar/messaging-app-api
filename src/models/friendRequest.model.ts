import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { User } from './user.model';


export class FriendRequest extends TimeStamps {
  @prop({ ref: () => User })
  public from!: Ref<User>;

  @prop({ ref: () => User })
  public to!: Ref<User>;
}

const FriendRequestModel = getModelForClass(FriendRequest);

export default FriendRequestModel;