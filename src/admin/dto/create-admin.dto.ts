import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsDate, IsEmail, IsStrongPassword , isPhoneNumber, IsDateString, IsPhoneNumber} from "class-validator";



export class CreateAdminDto {

    @ApiProperty({example: 'Fakhriddin', description: "Admin Ismi"})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example: 'Fakhriddin1989', description: "foydalanuvchi logini"})
    @IsNotEmpty()
    @IsString()
    login: string;

    @ApiProperty({example: 'pa$$worD1234', description: "admin paroli"})
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @ApiProperty({example: 'pa$$worD1234', description: "admin parolin tasdiqlash"})
    @IsNotEmpty()
    @IsString()
    confirm_password: string;
}
