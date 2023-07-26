import { Inject, Injectable } from '@nestjs/common';

/** DTOs */
import { CreateUserDto } from '../dtos/user.dto';

/** interfaces */
import { IUserModel } from '../interfaces/user.model.interface';
import { IUserService } from '../interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject(IUserModel) private readonly userModel: IUserModel) {}

  async create(body: CreateUserDto): Promise<any> {
    try {
      await this.userModel.create(body);
      return { status: true };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
