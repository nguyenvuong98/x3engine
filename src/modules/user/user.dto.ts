import { ApiProperty } from '@nestjs/swagger';
import {IsOptional, IsString, IsEmail, IsNotEmpty, IsEnum} from 'class-validator'
import { UserRole, UserStatus } from './user.interface';

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
        type: UserStatus,
        description: 'status',
      })
    status: UserStatus;

    @IsOptional()
    @IsEnum(UserRole)
    @ApiProperty({
        type: UserRole,
        description: 'role',
      })
    role: UserRole;

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
        description: 'createdAt',
      })
    updatedAt: Number;
}

export class UserRegiterRequestDdto {
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

    @IsOptional()
    @IsEmail()
    @ApiProperty({
        type: String,
        description: 'email',
      })
    email: string;

    @IsOptional()
    @IsEnum(UserRole)
    @ApiProperty({
        type: UserRole,
        description: 'role',
      })
    role: UserRole;

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