import { Controller, Get, Param, HttpException, HttpStatus, Res, UseGuards, Post, UploadedFile } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FilesService } from './files.service';
import { UploadFileConfig, IFile } from 'src/commons/decorators/UploadFile.decorator';
import { AuthUser, IAuthUser } from 'src/commons/decorators/Auth.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiHeader({
    name: 'Authorization',
    description: 'Bearer JWT',
})
@ApiTags('files')
@Controller('v1/files')
export class FilesController {
    constructor(private readonly filesServices: FilesService) { }

    @Get(':fileId')
    async findById(@Param('fileId') id: string, @Res() response: Response): Promise<any> {
        const result = await this.filesServices.findById(id)
        if (result) {
            const options = {
                root: result.destination,
                headers: {
                    'Content-Type': result.mimetype,
                    'Content-Length': result.size,
                    'Content-Disposition': `inline;filename="${result.filename}"`
                }
            };
            console.log("result", result)
            return response.sendFile(result.filename, options)

        }
        throw new HttpException(undefined, HttpStatus.NOT_FOUND);
    }


    @UseGuards(JwtAuthGuard)
    @UploadFileConfig('file', 'share')
    @Post('to/:username')
    async sendFile(@AuthUser() user: IAuthUser, @Param("username") username: string, @UploadedFile() file: IFile): Promise<any> {

        const result = this.filesServices.sendFile(user.userId, username, file)

        if (result) return result
        throw new HttpException(undefined, HttpStatus.NOT_FOUND);
    }
}
