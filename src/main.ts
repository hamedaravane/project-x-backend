import {ValidationPipe} from '@nestjs/common';
import { NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  /*const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));*/

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidUnknownValues: true}));

  await app.listen(3000);
}
bootstrap();
