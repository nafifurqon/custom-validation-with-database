import { Test, TestingModule } from '@nestjs/testing';

/** DTOs */
import { CreateUserDto } from '../dtos/user.dto';

/** Interface */
import { IUserModel } from '../interfaces/user.model.interface';

/** Services */
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userModel: IUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: IUserModel,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<IUserModel>(IUserModel);
  });

  describe('create', () => {
    const body: CreateUserDto = { email: 'example@email.com' };
    const expectedResult = { status: true };

    it('should be success create new user', async () => {
      jest.spyOn(userModel, 'create').mockResolvedValueOnce(true);

      const res = await service.create(body);

      expect(res).toEqual(expectedResult);
    });

    it('should be failed with unknown error', async () => {
      jest
        .spyOn(userModel, 'create')
        .mockRejectedValueOnce(new Error('Internal Server Error'));

      await expect(service.create(body)).rejects.toThrowError();
    });
  });
});
