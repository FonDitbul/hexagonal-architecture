import { IUserService } from '../domain/user.service';
import { Inject, Injectable } from '@nestjs/common';
import { UserSignUpIn } from '../interface/user.in';
import { IUserRepository } from '../domain/user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private userRepository: IUserRepository,
  ) {}

  async signUp(signUpIn: UserSignUpIn): Promise<void> {
    const { userId, email } = signUpIn;

    const userByUserId =
      await this.userRepository.findOneOrNullByUserId(userId);
    if (userByUserId) {
      throw new Error('중복된 userId가 존재합니다.');
    }

    const userByEmail = await this.userRepository.findOneOrNullByEmail(email);
    if (userByEmail) {
      throw new Error('중복된 email 이 존재합니다.');
    }

    await this.userRepository.signUp({ userId, email });

    return;
  }
}
