import {UsersController} from './users.controller';
import {UserDto} from './users.entities';
import {UsersService} from './users.service';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserDto])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
