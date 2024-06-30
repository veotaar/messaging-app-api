import * as argon2 from "argon2";

export const hashPassword = async (password: string) => {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch(_e) {
    console.error('There was an error.');
  }
}

export const verifyPassword = async (hash: string, candidatePassword: string) => {
  try {
    if (await argon2.verify(hash, candidatePassword)) {
      return true;
    } else {
      return false;
    }
  } catch(_e) {
    console.error('There was an error verifying password.');
  }
}