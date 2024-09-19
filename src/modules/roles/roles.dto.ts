import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class RoleDto {
    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'id',
      })
    id: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'name',
      })
    name: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'permission',
      })
    permission: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'createdBy',
      })
    createdBy: string;

    @ApiProperty({
        type: Number,
        description: 'createdAt',
      })
    createdAt: Number;

    @ApiProperty({
        type: Number,
        description: 'updatedAt',
      })
    updatedAt: Number;
}

export class RoleInputDto extends PickType(RoleDto, ['name', 'permission']) {}
export class RoleDeleteInputDto extends PickType(RoleDto, ['id']) {}