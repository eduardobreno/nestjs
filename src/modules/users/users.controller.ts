import { Body, Controller, Get, Post, Put, Param, UseGuards, HttpException, HttpStatus, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiHeader, ApiCreatedResponse } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { UploadFileConfig, IFile } from 'src/decorators/UploadFile.decorator';
import { AuthUser, IAuthUser } from 'src/decorators/Auth.decorator';
import { UsersService } from './users.service';
import { User } from './user.model';
import { CreateUserPayload } from './payloads/create-user.payload';
import { UpdateUserPayload } from './payloads/update-user.payload';
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer JWT',
})
@ApiTags('users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateUserPayload,
  })
  @Post()
  async create(@Body() body: CreateUserPayload): Promise<CreateUserPayload> {
    const result = await this.usersService.create(body as User);
    if (!result) {
      throw new HttpException('Email or username already in use', HttpStatus.CONFLICT);
    }
    return result as CreateUserPayload
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userId')
  async update(@Param('userId') id: string, @Body() model: UpdateUserPayload): Promise<UpdateUserPayload> {
    const result = await this.usersService.findByIdOrEmail(id)
    if (!result) {
      throw new HttpException(undefined, HttpStatus.NOT_FOUND);
    }
    return await this.usersService.update(id, model as User);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<CreateUserPayload[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async findByIdOrEmail(@Param('userId') id: string): Promise<CreateUserPayload> {
    const result = await this.usersService.findByIdOrEmail(id)
    if (!result) {
      throw new HttpException(undefined, HttpStatus.NOT_FOUND);
    }
    return result as CreateUserPayload
  }

  @UseGuards(JwtAuthGuard)
  @UploadFileConfig('file', 'profile')
  @Post('upload/profile/photo')
  async uploadFile(@AuthUser() user: IAuthUser, @UploadedFile() file: IFile): Promise<any> {
    console.log(user);
    console.log(file);

  }
}
