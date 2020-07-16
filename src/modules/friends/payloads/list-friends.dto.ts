import { ApiProperty } from '@nestjs/swagger';
import { BaseUserDto } from 'src/modules/users/payloads/base-user.dto';

export class ListFriendsDto extends BaseUserDto {

    @ApiProperty()
    createdAt: Date
}