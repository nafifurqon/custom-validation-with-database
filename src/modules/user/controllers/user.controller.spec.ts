import { Test, TestingModule } from '@nestjs/testing';

/** Controllers */
import { UserController } from './user.controller';

/** DTOs */
import { CreateUserDto } from '../dtos/user.dto';

/** Interface */
import { IUserService } from '../interfaces/user.service.interface';

describe('UserController', () => {
  let controller: UserController;
  let service: IUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserController,
        {
          provide: IUserService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<IUserService>(IUserService);
  });

  describe('create', () => {
    const body: CreateUserDto = { email: 'example@email.com' };
    const mockResult = { status: true };

    it('should be success create new user and return true', async () => {
      jest.spyOn(service, 'create').mockResolvedValueOnce(mockResult);

      const res = await controller.create(body);

      expect(res).toHaveProperty('status');
      expect(res.status).toBe(true);
    });
  });
});
