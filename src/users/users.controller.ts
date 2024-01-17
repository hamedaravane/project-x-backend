import {Body, Controller, Get, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {ApiResponse} from '../shared/api-response.model';
import {CreateUserResponse} from './users.entities';
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
   * @returns {Promise<ApiResponse<CreateUserResponse>>} A promise that resolves to the created UserEntity if successful.
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
  async uploadProfilePhoto(@UploadedFile() file: Express.Multer.File): Promise<{message: string}> {
    console.log(file);
    return {message: 'Profile photo uploaded successfully'};
  }
}
