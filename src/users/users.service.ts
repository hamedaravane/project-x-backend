import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import {Repository} from 'typeorm';
import {ApiResponse} from '../shared/api-response.model';
import {
  CreateUserDto,
  CreateUserResponse,
  LoginInfo,
  LoginUserResponse,
  UserEntity,
  convertUserDtoToUserEntity, userEntityToUserResponse
} from './users.entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({where: {email: email}});
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

  async loginUser(authInfo: LoginInfo): Promise<ApiResponse<LoginUserResponse>> {
    const user = await this.findUserByEmail(authInfo.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isValid = await bcrypt.compare(authInfo.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException();
    }
    const payload = {sub: user.uuid, email: user.email};
    const token = await this.jwtService.signAsync(payload);
    const userResponse = userEntityToUserResponse(user);
    const data = {
      token,
      message: 'you are successfully logged in',
      user: userResponse
    };
    return {
      success: true,
      data,
      timestamp: new Date(),
    };
  }
}
