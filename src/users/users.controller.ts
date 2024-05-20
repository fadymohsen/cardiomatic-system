import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':ssn')
  async getUserBySSN(@Param('ssn', ParseIntPipe) ssn: number) {
    const user = await this.usersService.getUserBySSN(ssn);
    if (!user) throw new HttpException('User Not Found by This SSN', 404);
    return user;
  }

  @Delete(':ssn')
  async deleteUserBySSN(@Param('ssn', ParseIntPipe) ssn: number) {
    const user = await this.usersService.getUserBySSN(ssn);
    if (!user) throw new HttpException('User Not Found by This SSN', 404);
    return this.usersService.deleteUserBySSN(ssn);
  }

  @Get('patients')
  async getAllPatients() {
    return this.userService.getAllPatients();
  }

  @Get('doctors')
  async getAllDoctors() {
    return this.userService.getAllDoctors();
  }

  @Get('by-gender')
  async getAllUsersByGender(@Query('gender') gender: string) {
    return this.userService.getAllUsersByGender(gender);
  }

  @Get('by-age')
  async getAllUsersByAge(@Query('age') age: number) {
    return this.userService.getAllUsersByAge(age);
  }
}
