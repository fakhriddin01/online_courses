import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateCategoryDto{
    @ApiProperty({example: 'IT', description: "Categoriya nomi"})
    @IsString()
    @IsOptional()
    name?: string;
}
