import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsEmail, IsOptional } from 'class-validator';


export class CreateUserPayload {
    @ApiProperty()
    @IsOptional()
    readonly photo: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly displayName: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({ required: true })
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({ required: true })
    @MinLength(8)
    readonly password: string;
}