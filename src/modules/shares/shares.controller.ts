import { Controller, Get, Param, HttpException, HttpStatus, Res, UseGuards, Post, UploadedFile } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SharesService } from './shares.service';
import { UploadFileConfig, IFile } from 'src/commons/decorators/UploadFile.decorator';
import { AuthUser, IAuthUser } from 'src/commons/decorators/Auth.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiHeader({
    name: 'Authorization',
    description: 'Bearer JWT',
})
@ApiTags('share')
@Controller('v1')
export class SharesController {
    constructor(private readonly sharesService: SharesService) { }

    @UseGuards(JwtAuthGuard)
    @Get('shared-with-me')
    async findAll(@Param('fileId') id: string, @Res() response: Response): Promise<any> {
        const result = await this.sharesService.findById(id)
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
    @Get('get-shared/')
    async findById(@Param('fileId') id: string, @Res() response: Response): Promise<any> {
        const result = await this.sharesService.findById(id)
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
    @Post('share-to/:username')
    async sendFile(@AuthUser() user: IAuthUser, @Param("username") username: string, @UploadedFile() file: IFile): Promise<any> {

        const result = this.sharesService.sendFile(user.userId, username, file)

        if (result) return result
        throw new HttpException(undefined, HttpStatus.NOT_FOUND);
    }
}
