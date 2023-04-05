import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsPhoneNumber, IsEmail} from "class-validator";

export class UpdateStudentDto  {
    @ApiProperty({example: 'Faxriddin', description: "Student ismi"})
    @IsString()
    first_name?: string;
    
    @ApiProperty({example: 'Abduraimov', description: "Student familiyasi"})
    @IsString()
    last_name?: string;

    @ApiProperty({example: 'Faxriddin@mail.uz', description: "Student emaili"})
    @IsEmail()
    email?: string;


    @ApiProperty({example: '+998991234567', description: "Student telefon raqami"})
    @IsPhoneNumber()
    phone?: string;
}
