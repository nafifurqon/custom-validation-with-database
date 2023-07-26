import { IsEmail } from 'class-validator';

/** commons */
import { IsUserExist } from '../commons/validators/user.validator';

export class CreateUserDto {
  @IsEmail()
  @IsUserExist()
  email: string;
}
