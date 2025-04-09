import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { EncoderService } from './encoder.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { JwtPayload } from '../jwt.payload.interface';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, 
    private EncoderService: EncoderService,
    private jwtService: JwtService
  ) { }

  create(loginDto: loginDto) {
    return 'This action adds a new auth';
  }

  async login(loginDto: loginDto) {
    const { email, password/*, confirmPassword*/ } = loginDto;

    // if (password !== confirmPassword) {
    //   throw new UnauthorizedException('Passwords do not match');
    // }

    const user = await this.EncoderService.findOneByEmail(email);
    
    if (user && (await this.EncoderService.checkPassword(password, user.password))) {
      const payload: JwtPayload= {id: user.id, email};
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('Invalid email or password');

  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
