import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ResponseEntities} from '../shared/response.entities';
import {CreateUserDto, CreateUserResponse, UserEntity, convertUserDtoToUserEntity} from './users.entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findUserById(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({uuid: id});
  }

  async registerUser(userDto: CreateUserDto): Promise<ResponseEntities<CreateUserResponse>> {
    const userEntity = convertUserDtoToUserEntity(userDto);
    const userRepository = this.userRepository.create(userEntity);
    await this.userRepository.save(userRepository);
    return {
      timestamp: new Date(),
      isSuccess: true,
      data: {email: userEntity.email},
    };
  }
}
