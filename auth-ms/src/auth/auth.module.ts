import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service'; // Adjust the path as needed
import { EncoderService } from './encoder.service';

@Module({
  imports: [
    // UsersModule,
    JwtModule.register({
      global: true,
      secret: '2f7a8e9d0a5d3b8c61c5e7d12e9c8a7f7b6c5e8d7a9b0c6d5e8a9b7c0d6e8a7f',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, EncoderService],
})
export class AuthModule {}
