import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsEmail, IsOptional } from 'class-validator';


export class UpdateUserPayload {
    @ApiProperty()
    @IsOptional()
    readonly photo: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly displayName: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly username: string;
}