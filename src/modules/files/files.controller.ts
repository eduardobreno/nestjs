import { Controller, Get, Param, HttpException, HttpStatus, Res } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { createReadStream } from 'fs'
import { FilesService } from './files.service';

@ApiHeader({
    name: 'Authorization',
    description: 'Bearer JWT',
})
@ApiTags('files')
@Controller('v1/files')
export class FilesController {
    constructor(private readonly filesServices: FilesService) { }

    @Get(':fileId')
    async findByIdOrEmail(@Param('fileId') id: string, @Res() response: Response): Promise<any> {
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
}
