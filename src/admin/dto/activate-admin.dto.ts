import { IsNotEmpty, IsNumber,IsInt } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ActivateUserDto {
    
    @ApiProperty({example: '2', description: "Admin ID raqami"})
    @IsNotEmpty()
    @IsInt()
    admin_id: number;
}