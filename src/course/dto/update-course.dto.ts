import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsOptional} from "class-validator";

export class UpdateCourseDto {
    @ApiProperty({example: '1', description: "Ustoz id raqami"})
    @IsOptional()
    @IsInt()
    teacher_id?: number;

    @ApiProperty({example: '1500000', description: "kurs narxi"})
    @IsOptional()
    @IsInt()
    price?: number;

    @ApiProperty({example: 'Node.js & Vue.js fullstack kursi', description: "kurs xaqida qisqa malumot"})
    @IsString()
    @IsOptional()
    info?: string;

    @ApiProperty({example: '1', description: "Categoriya id raqami"})
    @IsInt()
    @IsOptional()
    category_id?: number;

    @ApiProperty({example: 'Mundarija', description: "Kursning mundarijasi"})
    @IsString()
    @IsOptional()
    content?: string;
}
