import { Injectable } from '@nestjs/common';
import { convertUserDtoToUserEntity, CreateUserDto, UserEntity } from './users.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

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
