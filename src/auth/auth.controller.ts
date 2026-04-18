import { Body, Controller, Post } from '@nestjs/common';
import { LogInService } from './services/login.service';
import { LogInDto } from './dto/login.dto';
import { CreateUserDto } from "../users/dto/user.dto";
import { SignUpService } from './services/signUp.service';

@Controller("auth")
export class AuthController {
  constructor(
    private readonly logInService: LogInService,
    private readonly signUpService: SignUpService
  ) {}

  @Post("login")
  logIn(@Body() user: LogInDto){
    return this.logInService.execute(user)
  }

  @Post("signup")
  signUp(@Body() user: CreateUserDto){
    return this.signUpService.execute(user)
  }

}
