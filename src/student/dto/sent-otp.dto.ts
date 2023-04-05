import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsPhoneNumber} from "class-validator";

export class SendOtpDto {
    @ApiProperty({example: '+998991234567', description: "Student telefon raqami"})
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;
}