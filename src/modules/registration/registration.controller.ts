import {
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import {
  RegisterUserInputDto,
  RegisterUserResponseDto
} from './registration.dto';
import { RegistrationProducer } from './registration.producer';

@ApiTags('registration')
@Controller('registration')
export class RegistrationController {
  constructor(
    private registrationProducer: RegistrationProducer,
  ) {}

  @Post('')
  @ApiBearerAuth('')
  @ApiOperation({
    operationId: 'registerUser',
    description:
      'Registers and gets info on CDB users and checks on their application status/blacklist reason',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Returns current user registration status',
    type: RegisterUserResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Failed request to registration endpoint',
    type: BadRequestException,
  })
  async registerUser(@Body() payload: RegisterUserInputDto) {
    return this.registrationProducer.registerUser(payload);
  }
}