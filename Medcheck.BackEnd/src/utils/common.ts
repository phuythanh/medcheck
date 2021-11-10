import * as bcrypt from "bcrypt";
import { UserEntity } from "../entities/UserEntity";

export const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });
};

export const comparePassword = (
  user: UserEntity,
  password: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, res) => {
      resolve(res === true);
    });
  });
};
