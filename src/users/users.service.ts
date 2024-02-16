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
  convertUserDtoToUserEntity,
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

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      return false;
    }
    return await bcrypt.compare(password, user.password);
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
    const isValid = await this.validateUser(authInfo.email, authInfo.password);
    if (!isValid) {
      throw new UnauthorizedException();
    }
    const payload = {email: authInfo.email};
    const token = await this.jwtService.signAsync(payload);
    return {
      success: true,
      data: {token: token, message: 'You successfully logged in'},
      timestamp: new Date(),
    };
  }
}
