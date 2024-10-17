import { Dependencies, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Dependencies(UserRepository)
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }
}
