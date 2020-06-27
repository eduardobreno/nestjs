import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './MulterConfigService';


@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    })],
  providers: [MulterConfigService],
  controllers: [FilesController]
})
export class FilesModule { }
