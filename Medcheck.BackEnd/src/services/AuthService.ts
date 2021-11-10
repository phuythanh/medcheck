import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import * as jwt from "jsonwebtoken";
import { UserEntity } from "../entities/UserEntity";
import { UserRepository } from "../repositories/UserRepository";
import { comparePassword } from "../utils/common";

@Service()
export class AuthService {
  constructor(@InjectRepository() private userRepository: UserRepository) {}

  public async CreateToken(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (await comparePassword(user, password)) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user.id,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        "secretkey"
      );
      return token;
    }

    return undefined;
  }
}
