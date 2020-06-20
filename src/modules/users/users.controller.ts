import { Body, Controller, Get, Post, Put, Param, UseGuards, HttpException, HttpStatus } from '@nestjs/common';

import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { User } from './user.model';
import { CreateUserPayload } from './payloads/create-user.payload';
import { UpdateUserPayload } from './payloads/update-user.payload';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() body: CreateUserPayload): Promise<CreateUserPayload> {
    const result = await this.usersService.create(body as User);
    if (!result) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }
    return result as CreateUserPayload
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() model: UpdateUserPayload): Promise<UpdateUserPayload> {
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
  @Get(':id')
  async findByIdOrEmail(@Param('id') id: string): Promise<CreateUserPayload> {
    const result = await this.usersService.findByIdOrEmail(id)
    if (!result) {
      throw new HttpException(undefined, HttpStatus.NOT_FOUND);
    }
    return result as CreateUserPayload
  }
}
