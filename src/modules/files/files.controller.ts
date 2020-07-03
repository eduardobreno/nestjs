import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
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
    async findByIdOrEmail(@Param('fileId') id: string): Promise<any> {
        const result = await this.filesServices.findById(id)
        if (result) {
            return result
        }
        throw new HttpException(undefined, HttpStatus.NOT_FOUND);
    }
}
