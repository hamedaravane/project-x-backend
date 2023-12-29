import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './users.entities';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAllUsers(): User[] | null {
    return null;
  }

  @Get('/:id')
  async findUserById(@Param('id') id: number): Promise<User | null> {
    return await this.usersService.findUserById(id);
  }

  @Post('create')
  createUser() {}

  @Post('photo')
  async uploadProfilePhoto(@Body() data: { profilePhoto: string }) {
    const profilePhotoBlob = new Blob([data.profilePhoto], {type: 'image'})
    const identifier = `${crypto.randomUUID()}-${Math.random()}-${Date.now()}`;
    const fileName = `profile-photo-${identifier}.png`;

    return { message: 'Profile photo uploaded successfully' };
  }
}
