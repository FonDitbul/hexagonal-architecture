import { UserSignUpIn } from '../interface/user.in';

export interface IUserService {
  signUp: (signUpIn: UserSignUpIn) => Promise<void>;
}
