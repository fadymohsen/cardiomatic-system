import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/Prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  getUsers() {
    return this.prisma.user.findMany();
  }

  getUserBySSN(ssn: number) {
    return this.prisma.user.findUnique({ where: { ssn } });
  }

  async deleteUserBySSN(ssn: number) {
    const findUser = await this.getUserBySSN(ssn);
    if (!findUser) throw new HttpException('User Not Found by This SSN', 404);
    return this.prisma.user.delete({ where: { ssn } });
  }
}
