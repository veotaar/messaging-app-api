import UserModel from "../models/user.model";
import { hashPassword } from "../utils/password.utils";

interface CreateUserInput {
  email: string;
  username: string;
  password: string;
}

export const createUser = async (input: CreateUserInput) => {
  try {
    const hashedPassword = await hashPassword(input.password);

    const user = await UserModel.create({
      ...input,
      password: hashedPassword
    });
    return user;
  } catch(e: any) {
    throw new Error(e);
  }
}