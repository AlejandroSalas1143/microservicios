import { IsNumber, IsString } from 'class-validator';

export class ChangePasswordDto {
    @IsNumber()
    id: number;

    @IsString()
    currentPassword: string;

    @IsString()
    newPassword: string;
}