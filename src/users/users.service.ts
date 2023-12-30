import { Injectable } from '@nestjs/common';
import { UserDto } from './users.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserDto)
    private userRepository: Repository<UserDto>,
  ) {}

  async findUserById(id: string): Promise<UserDto | null> {
    return await this.userRepository.findOneBy({ uuid: id });
  }

  async registerUser(user: UserDto) {
    const userEntity = this.userRepository.create(user);
    await this.userRepository.save(userEntity);
    return userEntity;
  }
}
