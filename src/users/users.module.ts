import {Module} from '@nestjs/common';
import {MulterModule} from '@nestjs/platform-express';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MulterConfigService} from '../config/multer-config.service';
import {UsersController} from './users.controller';
import {UserEntity} from './users.entities';
import {UsersService} from './users.service';
import {JwtModule} from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    JwtModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
