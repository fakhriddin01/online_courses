import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsEmail, IsOptional} from "class-validator";

export class UpdateTeacherDto  {
    @ApiProperty({example: 'Faxriddin', description: "Ustoz ismi"})
    @IsString()
    @IsOptional()
    first_name?: string;

    @ApiProperty({example: 'Abduraimov', description: "Ustoz familiyasi"})
    @IsString()
    @IsOptional()
    last_name?: string;

    @ApiProperty({example: 'Node.js developer', description: "Ustozning yo`nalishi/lavozimi"})
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({example: 'Faxriddin@mail.uz', description: "Ustoz emaili"})
    @IsEmail()
    @IsOptional()
    email?: string;
}
