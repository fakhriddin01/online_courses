import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt} from "class-validator";

export class CreateStudentCourseDto {
    @ApiProperty({example: '1', description: "Student id raqami"})
    @IsNotEmpty()
    @IsInt()
    student_id: number;

    @ApiProperty({example: '1', description: "Kurs status id raqami"})
    @IsNotEmpty()
    @IsInt()
    status_id: number;

    @ApiProperty({example: '1', description: "Kurs id raqami"})
    @IsNotEmpty()
    @IsInt()
    course_id: number;
}
