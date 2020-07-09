import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';

export class UserPayload {
    @ApiProperty()
    readonly id?: string;

    @ApiProperty()
    readonly photoFileId: Schema.Types.ObjectId;

    @ApiProperty({ required: true })
    readonly displayName: string;

    @ApiProperty({ required: true })
    readonly username: string;

    @ApiProperty({ required: true })
    readonly email: string;

}