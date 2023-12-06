import { User } from '../domain/user';

export type UserSignUpOut = Pick<User, 'userId' | 'email'>;
