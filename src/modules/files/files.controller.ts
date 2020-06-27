import { Controller, Post, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as Multer from 'multer';

import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@ApiHeader({
    name: 'Authorization',
    description: 'Bearer JWT',
})
@ApiTags('files')
@Controller('v1/files')
export class FilesController {


    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FilesInterceptor('file', 2))
    async uploadFile(@UploadedFiles() files: Multer.File[]): Promise<any> {
        console.log(files);

    }

}
