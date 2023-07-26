import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

/** common */
import { EmailExistValidator } from './commons/validators/user.validator';

/** controllers */
import { UserController } from './controllers/user.controller';

/** interfaces */
import { IUserModel } from './interfaces/user.model.interface';
import { IUserService } from './interfaces/user.service.interface';

/** models */
import { UserModel } from './models/user.model';

/** services */
import { UserService } from './services/user.service';

/** entities */
import { UserEntity } from '../../entities/user.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: IUserService,
      useClass: UserService,
    },
    {
      provide: IUserModel,
      useClass: UserModel,
    },
    EmailExistValidator,
  ],
})
export class UserModule {}
