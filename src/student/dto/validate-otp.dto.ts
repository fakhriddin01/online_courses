import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsPhoneNumber} from "class-validator";

export class ValidateOtp {
    @ApiProperty({example: '1234', description: "OTP raqami"})
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