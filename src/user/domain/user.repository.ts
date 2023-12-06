import { UserSignUpOut } from '../interface/user.out';
import { User } from './user';

export interface IUserRepository {
  signUp: (signUpOut: UserSignUpOut) => Promise<void>;
  findOneOrNullByUserId: (userId: User['userId']) => Promise<User | null>;
  findOneOrNullByEmail: (userId: User['email']) => Promise<User | null>;
}
