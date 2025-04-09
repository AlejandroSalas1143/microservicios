import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateRegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

}
