import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '../application/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserService',
      useClass: UserService,
    },
  ],
})
export class UserModule {}
