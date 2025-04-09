import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';


@Injectable()
export class RegisterService {
  constructor(private prisma: PrismaService) { }
  async create(createRegisterDto: CreateRegisterDto) {

    const { password, ...rest } = createRegisterDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email: rest.email },
    });

    if (existingUser) {
      throw new Error('El correo ya está registrado. Usa otro.');
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const activationToken = randomBytes(32).toString('hex');
      const tokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 horas

      return await this.prisma.user.create({
        data: {
          ...rest,
          password: hashedPassword,
          activationToken,
          tokenExpiresAt,
        },
      });
    } catch (error) {

      console.error('Error al crear el usuario:', error);
      throw new Error('Error al crear el usuario.');
    }
  }

  async verifyAccount(token: string) {
    try {
      const result = await this.prisma.user.updateMany({
        where: {
          activationToken: token,
          tokenExpiresAt: {
            gte: new Date(),
          },
        },
        data: {
          isActive: true,
          activationToken: null,
          tokenExpiresAt: null,
        },
      });

      if (result.count === 0) {
        throw new NotFoundException('Token inválido o expirado.');
      }

      return { message: 'Cuenta activada exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error('Error al verificar la cuenta:', error);
      throw new Error('Error al activar la cuenta.');
    }
  }

  forgotPassword(email: string) {
    return `This action sends a forgot password email to ${email}`;
  }

  resetPassword(token: string, password: string) {
    return `This action resets the password for token ${token} to ${password}`;
  }

}
