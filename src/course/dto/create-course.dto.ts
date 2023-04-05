import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt} from "class-validator";

export class CreateCourseDto {
    @ApiProperty({example: '1', description: "Ustoz id raqami"})
    @IsNotEmpty()
    @IsInt()
    teacher_id: number;

    @ApiProperty({example: '1500000', description: "kurs narxi"})
    @IsNotEmpty()
    @IsInt()
    price: number;

    @ApiProperty({example: 'Node.js & Vue.js fullstack kursi', description: "kurs xaqida qisqa malumot"})
    @IsNotEmpty()
    @IsString()
    info: string;

    @ApiProperty({example: '1', description: "Categoriya id raqami"})
    @IsNotEmpty()
    @IsInt()
    category_id: number;

    @ApiProperty({example: 'Mundarija', description: "Kursning mundarijasi"})
    @IsString()
    content?: string;
}
