import { Injectable } from '@nestjs/common';

/** Entities */
import { UserEntity } from '../../../entities/user.entity';

/** Fakes */
import { FakeUserData } from './user.data.fake';

@Injectable()
export class UserQueryFake {
  private data: UserEntity[];

  constructor() {
    this.data = FakeUserData;
  }

  async checkEmailExist(): Promise<UserEntity[]> {
    return this.data;
  }
}
