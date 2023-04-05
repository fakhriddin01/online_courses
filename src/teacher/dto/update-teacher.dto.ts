import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsEmail} from "class-validator";

export class UpdateTeacherDto  {
    @ApiProperty({example: 'Faxriddin', description: "Ustoz ismi"})
    @IsString()
    first_name?: string;

    @ApiProperty({example: 'Abduraimov', description: "Ustoz familiyasi"})
    @IsString()
    last_name?: string;

    @ApiProperty({example: 'Node.js developer', description: "Ustozning yo`nalishi/lavozimi"})
    @IsString()
    title?: string;

    @ApiProperty({example: 'Faxriddin@mail.uz', description: "Ustoz emaili"})
    @IsEmail()
    email?: string;
}
