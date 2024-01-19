import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ApiResponse} from '../shared/api-response.model';
import {CreateUserDto, CreateUserResponse, UserEntity, convertUserDtoToUserEntity} from './users.entities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({where: {email: email}});
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.findUserByEmail(email);
    return bcrypt.compare(password, user.password);
  }

  async findProfilePhoto(email: string, isValid: boolean) {

  }

  async registerUser(userDto: CreateUserDto): Promise<ApiResponse<CreateUserResponse>> {
    const userEntity = convertUserDtoToUserEntity(userDto);
    const userRepository = this.userRepository.create(userEntity);
    await this.userRepository.save(userRepository);
    return {
      success: true,
      data: {email: userEntity.email, message: 'Your account successfully created'},
      timestamp: new Date(),
    };
  }
}
