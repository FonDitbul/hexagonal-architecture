import { IUserRepository } from '../../domain/user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.typeorm.entity';
import { UserSignUpOut } from '../../interface/user.out';
import { User } from '../../domain/user';

@Injectable()
export class UserTypeormRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  private convert(entity: UserEntity): User {
    return entity;
  }
  async findOneOrNullByEmail(email: User['email']): Promise<User | null> {
    const oneUser = await this.repository.findOneBy({ email });

    return this.convert(oneUser);
  }

  async findOneOrNullByUserId(userId: User['userId']): Promise<User | null> {
    const oneUser = await this.repository.findOneBy({ userId });

    return this.convert(oneUser);
  }

  async signUp(signUpOut: UserSignUpOut): Promise<void> {
    const { userId, email } = signUpOut;

    await this.repository.save({ userId: userId, email: email });
    return;
  }
}
