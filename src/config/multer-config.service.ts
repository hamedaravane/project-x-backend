import {Injectable} from '@nestjs/common';
import {MulterModuleOptions, MulterOptionsFactory} from '@nestjs/platform-express';

/*@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      dest: './upload',
    };
  }
}*/

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, '/tmp/my-uploads');
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
      },
    });
    return {
      storage,
      limits: {
        fieldNameSize: 100,
        fieldSize: 3 * 1024 * 1024,
        fileSize: 2 * 1024 * 1024,
      },
      preservePath: true,
    };
  }
}
