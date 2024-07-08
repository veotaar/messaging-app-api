import UserModel from "../models/user.model";
import { hashPassword, verifyPassword } from "../utils/password.utils";

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

export const validateUserPassword = async ({
  email,
  password
}: {
  email: string;
  password: string
}) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) return false;

    const isValid = await verifyPassword(user.password, password);

    if (!isValid) return false;

    return user;
  } catch(e: any) {
    throw new Error(e);
  }

}