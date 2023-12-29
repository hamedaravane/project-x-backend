import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      dest: './uploads',
      storage: {
        destination: './photos/profile',
        fileName: (req, file, callback) => {
          const identifier = `${crypto.randomUUID()}-${Math.random()}-${Date.now()}`;
          const fileName = `${file.originalname}-${identifier}`;
          callback(null, fileName);
        }
      },
      limits: {
        fileSize: 1024 * 1024 * 2
      }
    }
  }
}
