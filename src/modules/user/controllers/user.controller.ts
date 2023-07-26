import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

/** DTOs */
import { CreateUserDto } from '../dtos/user.dto';

/** interfaces */
import { IUserService } from '../interfaces/user.service.interface';

@Controller('user')
export class UserController {
  constructor(
    @Inject(IUserService)
    private readonly userService: IUserService,
  ) {}

  @Post('')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() body: CreateUserDto): Promise<any> {
    return await this.userService.create(body);
  }
}
