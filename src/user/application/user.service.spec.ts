import { UserService } from './user.service';
import { IUserRepository } from '../domain/user.repository';
import { User } from '../domain/user';
import { UserSignUpOut } from '../interface/user.out';
import { UserSignUpIn } from '../interface/user.in';

class UserRepositoryMocking implements IUserRepository {
  findOneOrNullByEmail(email: User['email']): Promise<User | null> {
    return Promise.resolve(null);
  }

  findOneOrNullByUserId(userId: User['userId']): Promise<User | null> {
    return Promise.resolve(null);
  }

  signUp(signUpOut: UserSignUpOut): Promise<void> {
    return Promise.resolve(null);
  }
}

describe('User Service test', () => {
  const userRepositoryMocking = new UserRepositoryMocking();
  const sut: UserService = new UserService(userRepositoryMocking);

  describe('유저 회원 가입 테스트', () => {
    it('유저 id 와 email 을 입력받아 회원가입에 성공한 경우', async () => {
      const givenSinUpIn: UserSignUpIn = {
        userId: 'user_1234',
        email: 'test@email.com',
      };
      jest
        .spyOn(userRepositoryMocking, 'findOneOrNullByUserId')
        .mockResolvedValue(null);
      jest
        .spyOn(userRepositoryMocking, 'findOneOrNullByEmail')
        .mockResolvedValue(null);

      await sut.signUp(givenSinUpIn);
    });

    it('유저 id가 중복되어 회원가입이 실패한 경우', async () => {
      const givenSinUpIn: UserSignUpIn = {
        userId: 'user_1234',
        email: 'test@email.com',
      };
      const givenUser: User = {
        id: 1,
        userId: 'user_1234',
        email: 'test1234@email.com',
      };
      jest
        .spyOn(userRepositoryMocking, 'findOneOrNullByUserId')
        .mockResolvedValue(givenUser);

      await expect(async () => sut.signUp(givenSinUpIn)).rejects.toThrowError(
        new Error('중복된 userId가 존재합니다.'),
      );
    });

    it('유저 id는 중복 X email 의 중복이 존재하는 경우', async () => {
      const givenSinUpIn: UserSignUpIn = {
        userId: 'user_1234',
        email: 'test@email.com',
      };
      const givenUser: User = {
        id: 1,
        userId: 'user_123456',
        email: 'test@email.com',
      };
      jest
        .spyOn(userRepositoryMocking, 'findOneOrNullByUserId')
        .mockResolvedValue(null);

      jest
        .spyOn(userRepositoryMocking, 'findOneOrNullByEmail')
        .mockResolvedValue(givenUser);

      await expect(async () => sut.signUp(givenSinUpIn)).rejects.toThrowError(
        new Error('중복된 email 이 존재합니다.'),
      );
    });
  });
});
