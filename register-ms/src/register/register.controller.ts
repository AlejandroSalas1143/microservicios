import { Controller, Get, Post, Req, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  create(@Body() createRegisterDto: CreateRegisterDto) {
    try{
      return this.registerService.create(createRegisterDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
  @Get('verify/:token')
  verifyAccount(@Param('token') token: string) {
    return this.registerService.verifyAccount(token);
  }

  @Get()
  findAll() {
    return this.registerService.findAll();
  }

  @Post('forgot-password')
  forgotPassword(@Body('email') email: string) {
    return this.registerService.forgotPassword(email);
  }

  @Patch('change-password')
  changePassword(/*@Req() req,*/ @Body() changePasswordDto: ChangePasswordDto) {
    return this.registerService.changePassword(/*req.user.id,*/ changePasswordDto);
  }
  
  
}
