import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsDate, IsEmail, IsStrongPassword , isPhoneNumber, IsDateString, IsPhoneNumber, IsOptional} from "class-validator";


export class UpdateAdminDto {
    @ApiProperty({example: 'Fakhriddin', description: "Admin Ismi"})
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({example: 'Fakhriddin1989', description: "foydalanuvchi logini"})
    @IsOptional()
    @IsString()
    login?: string;

}
