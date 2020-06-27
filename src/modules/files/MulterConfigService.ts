import { ConfigService } from '@nestjs/config';
import { diskStorage } from "multer";
import { nanoid } from 'nanoid'
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    constructor(private readonly configService: ConfigService) { }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: diskStorage(
                {
                    destination: this.configService.get<string>('UPLOAD_DIR'),
                    filename: function (req, file, cb) {
                        cb(null, `${nanoid(36)}${path.extname(file.originalname)}`)
                    }
                }
            )
        };
    }
}