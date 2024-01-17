import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import {TypeOrmConfigService} from './config/type-orm-config.service';
import {SharedModule} from './shared/shared.module';
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
    UsersModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
