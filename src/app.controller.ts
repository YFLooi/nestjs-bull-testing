import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('app')
@Controller('')
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  @ApiOperation({
    description: 'Simple hello world',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
