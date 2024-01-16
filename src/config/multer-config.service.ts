import {Injectable} from '@nestjs/common';
import {MulterModuleOptions, MulterOptionsFactory} from '@nestjs/platform-express';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      dest: './uploads',
      storage: {
        destination: './photos/profile',
        fileName: (req, file, callback): void => {
          const identifier = `${crypto.randomUUID()}-${Math.random()}-${Date.now()}`;
          const fileName = `${file.originalname}-${identifier}`;
          callback(null, fileName);
        },
      },
    };
  }
}
