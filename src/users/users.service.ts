import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/Prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    try {
      const user = await this.prisma.user.create({
        data,
      });
      if (data.role === 'Admin') {
        await this.prisma.admin.create({
          data: {
            adminId: user.userId,
            name: user.name,
            email: user.email,
            password: user.password,
            gender: user.gender,
            age: Number(user.age),
            ssn: user.ssn,
            contactInfo: user.contactInfo,
          },
        });
      } else if (data.role === 'Patient') {
        await this.prisma.patient.create({
          data: {
            patientId: user.userId,
            name: user.name,
            email: user.email,
            password: user.password,
            gender: user.gender,
            age: Number(user.age),
            ssn: user.ssn,
            contactInfo: user.contactInfo,
            MedicalHistory: user.MedicalHistory,
          },
        });
      } else if (data.role === 'PCP') {
        await this.prisma.pCP.create({
          data: {
            name: user.name,
            email: user.email,
            password: user.password,
            gender: user.gender,
            age: Number(user.age),
            ssn: user.ssn,
            contactInfo: user.contactInfo,
          },
        });
      }
      return user;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' &&
        Array.isArray(error.meta?.target) &&
        error.meta.target.includes('ssn')
      ) {
        throw new HttpException(
          'SSN is already in use.',
          HttpStatus.BAD_REQUEST,
        );
      } else if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' &&
        Array.isArray(error.meta?.target) &&
        error.meta.target.includes('email')
      ) {
        throw new HttpException(
          'Email is already in use.',
          HttpStatus.BAD_REQUEST,
        );
      }

      console.error('Error Creating User:', error);
      throw new HttpException(
        'Error creating user.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
