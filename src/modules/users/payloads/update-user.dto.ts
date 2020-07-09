import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsOptional()
    readonly displayName: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsOptional()
    readonly username: string;
}