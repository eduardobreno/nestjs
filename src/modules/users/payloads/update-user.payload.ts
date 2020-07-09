import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Schema } from 'mongoose';


export class UpdateUserPayload {
    @ApiProperty()
    @IsOptional()
    readonly photoFileId: Schema.Types.ObjectId;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly displayName: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly username: string;
}