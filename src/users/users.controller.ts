import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Delete,
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

  @Get('users/patients')
  async getUsersWithPCPRole() {
    return this.usersService.getAllPatients();
  }

  @Get('users/pcp')
  async getUsersWithPatientRole() {
    return this.usersService.getAllDoctors();
  }

  @Get('users/patients/male')
  async getAllUsersByGender() {
    return this.usersService.getAllPatientsMale();
  }

  @Get('users/patients/female')
  async getAllUsersByAge() {
    return this.usersService.getAllPatientsFemale();
  }

  @Delete(':allPatients')
  async deleteAllPatients() {
    return this.usersService.deleteAllPatients();
  }

  @Get('login')
  async getLoginDetails() {
    return this.usersService.getLoginDetails();
  }
}
