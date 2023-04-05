import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";

export class UpdateCategoryDto{
    @ApiProperty({example: 'IT', description: "Categoriya nomi"})
    @IsString()
    name?: string;
}
