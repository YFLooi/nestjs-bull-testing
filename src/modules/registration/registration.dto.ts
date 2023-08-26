import {
  IsString,
  IsEnum,
  IsObject,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { REGISTRATION_QUEUE } from './registration.const';

export class RegisterUserInputDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    description: `Setel's identifier for a user`,
    example: '82f5887c-0ef6-483b-b698-51a3c02a29e5',
  })
  name: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: `User's Malaysian NRIC`,
    example: '921221055147',
  })
  ICNumber: string;
}

export class RegisterUserResponseDto {
  RespData: RegisterUserInputDto;
}