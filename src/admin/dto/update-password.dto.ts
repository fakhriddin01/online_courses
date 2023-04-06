import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsDate, IsEmail, IsStrongPassword , isPhoneNumber, IsDateString, IsPhoneNumber} from "class-validator";


export class UpdatePasswordDto {
    @ApiProperty({example: 'pa$$worD', description: "eski paroli"})
    @IsNotEmpty()
    @IsString()
    old_password: string;

    @ApiProperty({example: 'pa$$worD1234', description: "yangi paroli"})
    @IsNotEmpty()
    @IsStrongPassword()
    new_password: string;

    @ApiProperty({example: 'pa$$worD1234', description: "yangi paroli tasdiqi"})
    @IsNotEmpty()
    @IsString()
    confirm_password: string;
}