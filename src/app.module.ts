import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MulterModule} from '@nestjs/platform-express';
import {TypeOrmModule} from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import {MulterConfigService} from './config/multer-config.service';
import {TypeOrmConfigService} from './config/type-orm-config.service';
import {UsersModule} from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['environment/.env.development.local', 'environment/.env.development'],
      isGlobal: true,
      load: [databaseConfig],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
