import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt} from "class-validator";

export class UpdateCourseDto {
    @ApiProperty({example: '1', description: "Ustoz id raqami"})
    @IsInt()
    teacher_id?: number;

    @ApiProperty({example: '1500000', description: "kurs narxi"})
    @IsInt()
    price?: number;

    @ApiProperty({example: 'Node.js & Vue.js fullstack kursi', description: "kurs xaqida qisqa malumot"})
    @IsString()
    info?: string;

    @ApiProperty({example: '1', description: "Categoriya id raqami"})
    @IsInt()
    category_id?: number;

    @ApiProperty({example: 'Mundarija', description: "Kursning mundarijasi"})
    @IsString()
    content?: string;
}
