import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/** interfaces */
import { IUserModel } from '../../interfaces/user.model.interface';

@ValidatorConstraint({ name: 'EmailExist', async: true })
@Injectable()
export class EmailExistValidator implements ValidatorConstraintInterface {
  constructor(@Inject(IUserModel) private readonly userModel: IUserModel) {}

  async validate(value: string): Promise<boolean> {
    try {
      const isEmailExist = await this.userModel.checkEmailExist(value);
      console.log('isEmailExist', isEmailExist);
      if (isEmailExist) return false;
      return true;
    } catch (e) {
      console.log('e.message', e.message);
      return false;
    }
  }

  defaultMessage(): string {
    return 'Email already exists';
  }
}

export const IsUserExist = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: EmailExistValidator,
    });
  };
};
