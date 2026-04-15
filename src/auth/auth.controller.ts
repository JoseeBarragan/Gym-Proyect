import { Body, Controller, Post } from '@nestjs/common';
import { LogInService } from './services/login.service';
import { LogInDto } from './dto/login.dto';

@Controller("auth")
export class AuthController {
  constructor(private readonly logInService: LogInService) {}

  @Post("login")
  logIn(@Body() user: LogInDto){
    return this.logInService.execute(user)
  }
}
