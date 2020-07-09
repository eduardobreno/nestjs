import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { File } from 'src/modules/files/file.model';


export class UpdateUserPayload {
    @ApiProperty()
    @IsOptional()
    readonly photo: File

    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly displayName: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly username: string;
}