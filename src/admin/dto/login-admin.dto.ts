import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsDate, IsEmail, IsStrongPassword , isPhoneNumber, IsDateString, IsPhoneNumber} from "class-validator";



export class LoginAdminDto {

    @ApiProperty({example: 'Fakhriddin111', description: "Admin logini"})
    @IsNotEmpty()
    @IsString()
    login: string;

    @ApiProperty({example: 'pa$$worD1234', description: "admin parolin tasdiqlash"})
    @IsNotEmpty()
    @IsString()
    password: string;
}
