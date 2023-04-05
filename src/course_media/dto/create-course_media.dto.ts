import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt} from "class-validator";

export class CreateCourseMediaDto {
    @ApiProperty({example: '1', description: "Kurning id raqami"})
    @IsNotEmpty()
    @IsInt()
    course_id: number;
}
