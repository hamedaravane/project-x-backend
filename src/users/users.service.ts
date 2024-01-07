import { Injectable } from '@nestjs/common';
import {
  convertUserDtoToUserEntity,
  CreateUserDto,
  UserEntity,
} from './users.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findUserById(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ uuid: id });
  }

  async registerUser(userDto: CreateUserDto) {
    const userEntity = convertUserDtoToUserEntity(userDto);
    const userRepository = this.userRepository.create(userEntity);
    await this.userRepository.save(userRepository);
    return userEntity;
  }
}
