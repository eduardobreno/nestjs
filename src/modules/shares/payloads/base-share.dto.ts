import { ApiProperty } from '@nestjs/swagger';

export class BaseShareDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    mimeType: string;
    @ApiProperty()
    url: string;
    @ApiProperty()
    size: string;
    @ApiProperty()
    createdAt: string;
}