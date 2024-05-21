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
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
          },
        });
      } else if (data.role === 'Patient') {
        await this.prisma.patient.create({
          data: {
            patientId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            MedicalHistory: user.MedicalHistory,
          },
        });
      } else if (data.role === 'PCP') {
        await this.prisma.pCP.create({
          data: {
            pcpId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
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

  async getAllPatients() {
    return this.prisma.user.findMany({
      select: {
        firstName: true,
        dateOfBirth: true,
        gender: true,
        email: true,
      },
      where: {
        role: 'Patient',
      },
    });
  }

  async getAllPatientsMale() {
    return this.prisma.user.findMany({
      where: {
        role: 'Patient',
        gender: 'male',
      },
    });
  }

  async getAllPatientsFemale() {
    return this.prisma.user.findMany({
      where: {
        role: 'Patient',
        gender: 'female',
      },
    });
  }

  async getAllDoctors() {
    return this.prisma.user.findMany({
      select: {
        firstName: true,
        dateOfBirth: true,
        gender: true,
        email: true,
      },
      where: {
        role: 'PCP',
      },
    });
  }

  async deleteAllPatients() {
    return this.prisma.user.deleteMany({ where: { role: 'Patient' } });
  }

  async getLoginDetails() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => ({
      email: user.email,
      password: user.password,
      role: user.role,
    }));
  }
}
