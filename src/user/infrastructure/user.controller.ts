import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserSignUpDto } from './user.dto';
import { IUserService } from '../domain/user.service';

@Controller()
export class UserController {
  constructor(@Inject('IUserService') private userService: IUserService) {}
  @Post('/user/sign-up')
  async signUp(@Body() signUpDto: UserSignUpDto) {
    const { userId, email } = signUpDto;

    await this.userService.signUp({
      userId,
      email,
    });
    return true;
  }
}
