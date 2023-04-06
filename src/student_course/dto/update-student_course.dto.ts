import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsOptional} from "class-validator";

export class UpdateStudentCourseDto {
    @ApiProperty({example: '1', description: "Sotib olingan Kurs status id raqami"})
    @IsInt()
    @IsOptional()
    status_id?: number;

    @ApiProperty({example: '10', description: "Kurs o`zlashtirish progressi"})
    @IsInt()
    @IsOptional()
    progress?: number;
}
