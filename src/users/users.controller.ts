import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {ApiResponse} from '../shared/api-response.model';
import {CreateUserResponse, LoginInfo, LoginUserResponse} from './users.entities';
import {CreateUserDto} from './users.entities';
import {UsersService} from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAllUsers(): CreateUserDto[] | null {
    return null;
  }

  /*@Get('/:uuid')
  async findUserById(@Param('uuid') uuid: string): Promise<UserDto | null> {
    return await this.usersService.findUserById(uuid);
  }*/

  /**
   * Create a new user.
   * @description This endpoint allows the creation of a new user by accepting user data through the request body.
   * @param {CreateUserDto} createUserDto - The data object containing information for creating a new user.
   * @returns {Promise<ApiResponse<CreateUserResponse>>} A promise that resolves to the created UserEntity if
   *   successful.
   * @author Hamed Arghavan
   */

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<CreateUserResponse>> {
    console.log(createUserDto);
    try {
      return await this.usersService.registerUser(createUserDto);
    } catch (error) {
      throw new HttpException(error.message || 'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePhoto(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({maxSize: 1000}), new FileTypeValidator({fileType: 'image/png'})],
      }),
    ) // eslint-disable-next-line @typescript-eslint/no-unused-vars
    file: Express.Multer.File,
  ): Promise<{message: string}> {
    return {message: 'Profile photo uploaded successfully'};
  }

  @Post('login')
  async loginUser(@Body() authInfo: LoginInfo): Promise<ApiResponse<LoginUserResponse>> {
    return await this.usersService.loginUser(authInfo);
  }
}
