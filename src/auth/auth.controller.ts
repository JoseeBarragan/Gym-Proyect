import { Body, Controller, Post, Res } from '@nestjs/common';
import { LogInService } from './services/login.service';
import { LogInDto } from './dto/login.dto';
import { CreateUserDto } from "../users/dto/user.dto";
import { SignUpService } from './services/signUp.service';
import type { Response } from 'express';
import { Public } from '../shared/decorators/PublicDecorator';

@Controller("auth")
export class AuthController {
  constructor(
    private readonly logInService: LogInService,
    private readonly signUpService: SignUpService
  ) {}

  @Public()
  @Post("login")
  async logIn(@Body() user: LogInDto, @Res() res: Response){
    const token = await this.logInService.execute(user)

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    }).send({ token: token});
  }

  @Public()
  @Post("signup")
  async signUp(@Body() user: CreateUserDto){
    return await this.signUpService.execute(user)
  }

}
