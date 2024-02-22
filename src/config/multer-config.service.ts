import {Injectable} from '@nestjs/common';
import {MulterModuleOptions, MulterOptionsFactory} from '@nestjs/platform-express';
import {DiskStorageOptions, diskStorage} from 'multer';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    const options: DiskStorageOptions = {
      destination: 'uploads/photos/profile',
			filename: (req, file, callback): void => {
				callback(null, `${file.originalname}.png`);
			}
    };
    return {
      storage: diskStorage(options),
      limits: {
        fieldNameSize: 100,
        fieldSize: 3 * 1024 * 1024,
        fileSize: 2 * 1024 * 1024
      },
      preservePath: true
    };
  }
}
