import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/modules/users/users.module';
import { File, FileSchema } from './file.model';
import { FilesService } from './files.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]), UsersModule],
  controllers: [],
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModule { }
