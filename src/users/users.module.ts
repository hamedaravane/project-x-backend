import {UsersController} from './users.controller';
import {CreateUserDto} from './users.entities';
import {UsersService} from './users.service';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CreateUserDto])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
