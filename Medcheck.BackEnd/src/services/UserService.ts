import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

import { UserEntity } from "../entities/UserEntity";
import { UserRepository } from "../repositories/UserRepository";
import { hashPassword } from "../utils/common";

@Service()
export class UserService {
  constructor(@InjectRepository() private userRepository: UserRepository) {}

  public find(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  public findOne(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ id });
  }

  public async create(user: UserEntity): Promise<UserEntity> {
    const hashPasswordValue = await hashPassword(user.password);
    user.password = hashPasswordValue;
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  public update(id: number, user: UserEntity): Promise<UserEntity> {
    user.id = id;
    return this.userRepository.save(user);
  }

  public async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
    return;
  }
}
