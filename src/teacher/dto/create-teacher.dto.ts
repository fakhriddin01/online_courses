import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsEmail} from "class-validator";

export class CreateTeacherDto {
    @ApiProperty({example: 'Faxriddin', description: "Ustoz ismi"})
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @ApiProperty({example: 'Abduraimov', description: "Ustoz familiyasi"})
    @IsNotEmpty()
    @IsString()
    last_name: string;

    @ApiProperty({example: 'Node.js developer', description: "Ustozning yo`nalishi/lavozimi"})
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({example: 'Faxriddin@mail.uz', description: "Ustoz emaili"})
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
