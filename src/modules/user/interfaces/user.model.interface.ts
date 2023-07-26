/** DTOs */
import { CreateUserDto } from '../dtos/user.dto';

export interface IUserModel {
  checkEmailExist(email: string): Promise<boolean>;
  create(body: CreateUserDto): Promise<any>;
}

export const IUserModel = Symbol('IUserModel');
