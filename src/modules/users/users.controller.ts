import { Body, Controller, Get, Post, Put, Param, UseGuards, HttpException, HttpStatus, UploadedFile, Req, Res, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { UploadFileConfig, IFile } from 'src/commons/decorators/UploadFile.decorator';
import { AuthUser, IAuthUser } from 'src/commons/decorators/Auth.decorator';
import { TransformFieldInUrlInterceptor } from 'src/commons/interceptors/transform.interceptor';
import { UsersService } from './users.service';
import { User } from './user.model';
import { UpdateUserDto } from './payloads/update-user.dto';
import { getHttpUrl, transformJsonField } from 'src/commons/helpers/url.helper';
import { CreateUserDto } from './payloads/create-user.dto';

@ApiTags('users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    const result = await this.usersService.create(body as User);
    if (result) return result

    throw new HttpException('Email or username already in use', HttpStatus.CONFLICT);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userId')
  async update(@Param('userId') id: string, @Body() model: UpdateUserDto): Promise<User> {
    const result = await this.usersService.findByIdOrEmail(id)
    if (result) {
      return await this.usersService.update(id, model as User);
    }
    throw new HttpException(undefined, HttpStatus.NOT_FOUND);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: Request): Promise<User[]> {
    const result = await this.usersService.findAll();

    return result.map(user => {
      if (user.photo)
        return transformJsonField(user.toJSON(), 'photo', `${getHttpUrl(req)}api/v1/users/profile/photo/${user.id}`) as User
      return user
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async findByIdOrEmail(@Param('userId') id: string, @Req() req: Request): Promise<User> {
    const result = await this.usersService.findByIdOrEmail(id)
    if (result) {
      return transformJsonField(result.toJSON(), 'photo', `${getHttpUrl(req)}api/v1/users/profile/photo/${result.id}`) as User
    }
    throw new HttpException(undefined, HttpStatus.NOT_FOUND);
  }

  @UseGuards(JwtAuthGuard)
  @UploadFileConfig('file', 'profile')
  @Post('upload/profile/photo')
  async uploadFile(@AuthUser() user: IAuthUser, @Req() req: Request, @UploadedFile() file: IFile): Promise<User> {
    const result = await this.usersService.updatePhoto(user.userId, file)
    if (result) {
      return transformJsonField(result.toJSON(), 'photo', `${getHttpUrl(req)}api/v1/users/profile/photo/${result.id}`) as User
    }
    throw new HttpException(undefined, HttpStatus.NOT_FOUND);
  }

  @Get('profile/photo/:userId')
  async findPhotoByUser(@Param('userId') id: string, @Res() response: Response): Promise<any> {
    const result = (await this.usersService.findByIdOrEmail(id)).photo
    if (result) {
      const options = {
        root: result.destination,
        headers: {
          'Content-Type': result.mimetype,
          'Content-Length': result.size,
          'Content-Disposition': `inline;filename="${result.filename}"`
        }
      };
      return response.sendFile(result.filename, options)

    }
    throw new HttpException(undefined, HttpStatus.NOT_FOUND);
  }
}
