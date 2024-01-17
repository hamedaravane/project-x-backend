import {Injectable} from '@nestjs/common';
import {MulterModuleOptions, MulterOptionsFactory} from '@nestjs/platform-express';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      dest: './upload',
    };
  }
}

/*@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    console.log('Creating Multer options...');
    return {
      dest: './uploads',
      storage: {
        destination: 'mos',
        filename: 'kos',
      },
      limits: {
        fieldNameSize: 100,
        fieldSize: 3 * 1024 * 1024,
        fileSize: 2 * 1024 * 1024,
      },
      preservePath: true,
    };
  }
}
*/
