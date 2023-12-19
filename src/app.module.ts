import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entities';
import databaseConfig from './config/database.config';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      isGlobal: true,
      load: [databaseConfig],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('database.host'),
          port: +configService.get<string>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.name'),
          entities: [User],
          synchronize: true,
        };
      },
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      },
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
