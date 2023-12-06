import { User } from '../domain/user';

export type UserSignUpIn = Pick<User, 'userId' | 'email'>;
