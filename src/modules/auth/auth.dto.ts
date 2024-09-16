import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class SignIdRequestDto {
    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'username',
      })
    username: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'password',
      })
    password: string;
}
