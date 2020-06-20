import { Body, Controller, Get, Post, Put, Param, UseGuards, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';

import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { User, UserPayload } from './user.model';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() body: UserPayload): Promise<UserPayload> {
    const result = await this.usersService.create(body as User);
    if (!result) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }
    return result as UserPayload
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() model: UserPayload): Promise<UserPayload> {
    const result = await this.usersService.findByIdOrEmail(id)
    if (!result) {
      throw new HttpException(undefined, HttpStatus.NOT_FOUND);
    }
    return await this.usersService.update(id, model as User);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<UserPayload[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findByIdOrEmail(@Param('id') id: string): Promise<UserPayload> {
    const result = await this.usersService.findByIdOrEmail(id)
    if (!result) {
      throw new HttpException(undefined, HttpStatus.NOT_FOUND);
    }
    return result as UserPayload
  }
}
