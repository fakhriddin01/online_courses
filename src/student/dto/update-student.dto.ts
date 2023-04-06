import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsPhoneNumber, IsEmail, IsOptional} from "class-validator";

export class UpdateStudentDto  {
    @ApiProperty({example: 'Faxriddin', description: "Student ismi"})
    @IsString()
    @IsOptional()
    first_name?: string;
    
    @ApiProperty({example: 'Abduraimov', description: "Student familiyasi"})
    @IsString()
    @IsOptional()
    last_name?: string;

    @ApiProperty({example: 'Faxriddin@mail.uz', description: "Student emaili"})
    @IsEmail()
    @IsOptional()
    email?: string;


    @ApiProperty({example: '+998991234567', description: "Student telefon raqami"})
    @IsPhoneNumber()
    @IsOptional()
    phone?: string;
}
