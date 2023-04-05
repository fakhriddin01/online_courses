import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";


export class CreateCategoryDto {

    @ApiProperty({example: 'IT', description: "Categoriya nomi"})
    @IsNotEmpty()
    @IsString()
    name: string;
}
