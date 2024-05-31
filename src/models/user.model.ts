import { getModelForClass, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';


export class User extends TimeStamps {
  @prop({ unique: true, type: () => String })
  public email!: string;

  @prop({ type: () => String })
  public username!: string;

  @prop({ type: () => String })
  public password!: string;

  // @prop({ ref: () => User, type: () => Array })
  // public friends?: Ref<User>[];
}

const UserModel = getModelForClass(User);

export default UserModel;