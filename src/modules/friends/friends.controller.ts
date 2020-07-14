import { Controller, Get, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { FriendsService } from './friends.service';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { AuthUser, IAuthUser } from 'src/commons/decorators/Auth.decorator';
import { FriendshipStatus } from 'src/commons/constants';
import { Friend } from './friend.model';

@ApiHeader({
    name: 'Authorization',
    description: 'Bearer JWT',
})
@ApiTags('friends')
@Controller('v1/friends')
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) { }

    @UseGuards(JwtAuthGuard)
    @Get('request/:username')
    async requestFriend(@Param('username') username: string, @AuthUser() user: IAuthUser): Promise<Friend> {
        const result = await this.friendsService.requestFriend(user.userId, username)
        if (result) return result
        throw new HttpException(undefined, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard)
    @Get('pending')
    async findPendingRequest(@AuthUser() user: IAuthUser): Promise<Friend[]> {
        const result = await this.friendsService.findPendingRequest(Types.ObjectId(user.userId))
        if (result) return result
        throw new HttpException(undefined, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard)
    @Get('action/:action/:username')
    async answerRequest(@AuthUser() user: IAuthUser, @Param("action") action: FriendshipStatus, @Param("username") username: string): Promise<Friend> {

        const result = await this.friendsService.changeFriendStatus(user.userId, action.toUpperCase() as FriendshipStatus, username)

        if (result) return result
        throw new HttpException(undefined, HttpStatus.NOT_FOUND);
    }
}
