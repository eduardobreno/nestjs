import { ApiProperty } from '@nestjs/swagger';

export class UserPayload {
    @ApiProperty()
    readonly id?: string;

    @ApiProperty()
    readonly photo: string;

    @ApiProperty({ required: true })
    readonly displayName: string;

    @ApiProperty({ required: true })
    readonly username: string;

    @ApiProperty({ required: true })
    readonly email: string;

}