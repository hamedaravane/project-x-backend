import {ValidationPipe} from '@nestjs/common';
import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {AllExceptionsFilter} from './shared/all-exceptions.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidUnknownValues: true}));

  await app.listen(3000);
}
bootstrap();
