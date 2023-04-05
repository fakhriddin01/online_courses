import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt} from "class-validator";

export class RefreshTokenDto {
    @ApiProperty({example: '$124$ka;skldfjkfasfkja;skdfjas;dlkfasl', description: "refresh token"})
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}