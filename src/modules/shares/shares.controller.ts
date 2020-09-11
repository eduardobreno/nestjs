import { Controller, Get, Param, HttpException, HttpStatus, Res, UseGuards, Post, UploadedFile, Req } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { SharesService } from './shares.service';
import { UploadFileConfig, IFile } from 'src/commons/decorators/UploadFile.decorator';
import { AuthUser, IAuthUser } from 'src/commons/decorators/Auth.decorator';
import { getHttpUrl } from 'src/commons/helpers/url.helper';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BaseShareDto } from './payloads/base-share.dto';

const DOWNLOAD_FILE_URL = 'api/v1/shared/'

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
    async findAll(@AuthUser() user: IAuthUser, @Req() req: Request): Promise<BaseShareDto[]> {
        const result = await this.sharesService.findSharedToUserId(user.userId)
        if (result) {
            return result.map(shared => {
                const f = new BaseShareDto()
                f.id = shared.id
                f.mimeType = shared.file.mimetype
                f.size = shared.file.size
                f.url = `${getHttpUrl(req)}${DOWNLOAD_FILE_URL}${shared.id}`
                f.createdAt = shared.createdAt
                return f
            })

        }
        throw new HttpException(undefined, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard)
    @Get('shared')
    async findById(@AuthUser() user: IAuthUser): Promise<any> {
        const result = await this.sharesService.findSharedToUserId(user.userId)
        if (result) {
            return result.map(shared => {
                const f = new BaseShareDto()
                f.id = shared.id
                f.createdAt = shared.createdAt
                return f
            })

        }

        throw new HttpException(undefined, HttpStatus.NOT_FOUND);
    }


    @UseGuards(JwtAuthGuard)
    @UploadFileConfig('file', 'share')
    @Post('share-to/:username')
    async sendFile(@AuthUser() user: IAuthUser, @Param("username") username: string, @UploadedFile() file: IFile): Promise<any> {
        const result = await this.sharesService.sendFile(Types.ObjectId(user.userId), username, file)

        if (result) return result
        throw new HttpException(undefined, HttpStatus.NOT_FOUND);
    }
}
