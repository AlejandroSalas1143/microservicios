import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class EncoderService {
    constructor(private prisma: PrismaService) { }
    async findOneByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new UnauthorizedException('Invalid email or password');
        }
        return user;
      }

    async checkPassword(password: string, userPassword: string) {
        return await bcrypt.compare(password, userPassword);
    }
}