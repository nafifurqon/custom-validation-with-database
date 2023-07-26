/** DTOs */
import { CreateUserDto } from '../dtos/user.dto';

export interface IUserService {
  create(body: CreateUserDto): Promise<any>;
}

export const IUserService = Symbol('IUserService');
