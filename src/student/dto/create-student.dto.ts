import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsPhoneNumber, IsEmail} from "class-validator";

export class CreateStudentDto {
    @ApiProperty({example: 'Faxriddin', description: "Student ismi"})
    @IsNotEmpty()
    @IsString()
    first_name: string;
    
    @ApiProperty({example: 'Abduraimov', description: "Student familiyasi"})
    @IsNotEmpty()
    @IsString()
    last_name: string;

    @ApiProperty({example: 'Faxriddin@mail.uz', description: "Student emaili"})
    @IsEmail()
    email?: string;

    @ApiProperty({example: '1234', description: "OTP raqam"})
    @IsNotEmpty()
    @IsString()
    otp: string;

    @ApiProperty({example: '+998991234567', description: "Student telefon raqami"})
    @IsNotEmpty()
    @IsPhoneNumber()
    check: string;

    @ApiProperty({example: '$kasldjfh$kajdf.k', description: "shifrlangan text"})
    @IsNotEmpty()
    @IsString()
    varification_key: string;
}
