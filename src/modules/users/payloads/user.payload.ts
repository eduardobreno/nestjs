import { ApiProperty } from '@nestjs/swagger';
import { File } from 'src/modules/files/file.model';

export class UserPayload {
    @ApiProperty()
    readonly id?: string;

    @ApiProperty()
    readonly photo: File

    @ApiProperty({ required: true })
    readonly displayName: string;

    @ApiProperty({ required: true })
    readonly username: string;

    @ApiProperty({ required: true })
    readonly email: string;

}