import { Controller, Get, Param, Post } from '@nestjs/common';
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
}
