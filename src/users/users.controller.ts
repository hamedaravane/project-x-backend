import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './users.entities';
import { UsersService } from './users.service';

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

  @Post('create')
  async createUser(@Body() userEntity: CreateUserDto) {
    console.log(userEntity);
    return await this.usersService.registerUser(userEntity);
  }

  @Post('photo')
  async uploadProfilePhoto(@Body() data: { profilePhoto: string }) {
    const profilePhotoBlob = new Blob([data.profilePhoto], { type: 'image' });
    const identifier = `${crypto.randomUUID()}-${Math.random()}-${Date.now()}`;
    const fileName = `profile-photo-${identifier}.png`;

    return { message: 'Profile photo uploaded successfully' };
  }
}
