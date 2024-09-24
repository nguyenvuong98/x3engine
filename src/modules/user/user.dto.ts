import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import {IsOptional, IsString, IsEmail, IsNotEmpty, IsEnum, MinLength} from 'class-validator'
import { UserRole, UserStatus } from './user.interface';
import { RoleDto } from '../roles/roles.dto';

export class UserDto {
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
        description: 'username',
      })
    username: string;

    @IsOptional()
    @IsEmail()
    @ApiProperty({
        type: String,
        description: 'email',
      })
    email: string;

    @IsOptional()
    @IsEnum(UserStatus)
    @ApiProperty({
        enum: UserStatus,
        description: 'status',
      })
    status: UserStatus;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'firstName',
      })
    firstName: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'middleName',
      })
    middleName: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'lastName',
      })
    lastName: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'accessToken',
      })
    accessToken: string;

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

export class UserRegiterRequestDdto {
    @IsNotEmpty({message:'username must be not empty'})
    //@IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'username',
      })
    username: string;

    @IsString()
    @IsNotEmpty({message:'password must be not empty'})
    @MinLength(8)
    @ApiProperty({
        type: String,
        description: 'password',
      })
    password: string;

    @IsNotEmpty({message:'email must be not empty'})
    @IsEmail()
    @ApiProperty({
        type: String,
        description: 'email',
      })
    email: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'firstName',
      })
    firstName: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'middleName',
      })
    middleName: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'lastName',
      })
    lastName: string;

}

export class UserAddPermissionInput extends PickType(UserDto, ['email']) {
  @IsNotEmpty({message:'permissionIds must be not empty'})
  @ApiProperty({
      type: [String],
      description: 'permissions',
    })
  permissions: string[];
}