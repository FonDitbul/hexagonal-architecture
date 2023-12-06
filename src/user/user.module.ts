import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/user.controller';
import { UserService } from './application/user.service';
import { DatabaseModule } from '../database/database.module';
import { UserTypeormRepository } from './infrastructure/typeorm/user.typeorm.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserService',
      useClass: UserService,
    },
    {
      provide: 'IUserRepository',
      useClass: UserTypeormRepository,
    },
  ],
})
export class UserModule {}
