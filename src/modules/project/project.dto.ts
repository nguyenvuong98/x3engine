import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ProjectDto {
    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'id',
      })
    id: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'name',
      })
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'userCreated',
      })
    userCreated: string;

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

export class ProjectCreateRequestDto extends PickType(ProjectDto, ['name']) {}

export class ProjectUpdateRequestDto extends PickType(ProjectDto, ['id', 'name']) {}

export class ProjectDeleteRequestDto extends PickType(ProjectDto, ['id']) {}