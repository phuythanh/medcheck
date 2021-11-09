import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

import { User } from "../entity/User";
import { UserRepository } from "../repositories/UserRepository";

@Service()
export class UserService {
  constructor(@InjectRepository() private userRepository: UserRepository) {}

  public find(): Promise<User[]> {
    return this.userRepository.find({ relations: ["pets"] });
  }

  public findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ id });
  }

  public async create(user: User): Promise<User> {
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  public update(id: number, user: User): Promise<User> {
    user.id = id;
    return this.userRepository.save(user);
  }

  public async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
    return;
  }
}
