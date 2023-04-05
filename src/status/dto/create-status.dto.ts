import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt} from "class-validator";


export class CreateStatusDto {
    @ApiProperty({example: 'paid', description: "status nomi"})
    @IsNotEmpty()
    @IsString()
    name: string;
}
