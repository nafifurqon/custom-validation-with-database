import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';

/** DTOs */
import { CreateUserDto } from '../dtos/user.dto';

/** Fakes */
import { UserQueryFake } from '../__fakes__/user.query.fake';

/** Models */
import { UserModel } from './user.model';

describe('UserModel', () => {
  const userQueryFake: UserQueryFake = new UserQueryFake();
  let userModel: UserModel;
  let connection: DataSource;

  interface QueryRunner {
    readonly manager: EntityManager;
  }

  const queryRunner = {
    manager: {},
  } as QueryRunner;

  const nestedQueryBuilder: any = {
    getRepository: () => nestedQueryBuilder,
    query: () => Promise.resolve(),
  };

  beforeEach(async () => {
    Object.assign(queryRunner.manager, { getRepository: () => jest.fn() });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserModel,
        {
          provide: DataSource,
          useValue: queryRunner,
        },
        {
          provide: getConnectionToken(),
          useValue: queryRunner,
        },
      ],
    }).compile();

    userModel = module.get<UserModel>(UserModel);
    connection = module.get<DataSource>(getConnectionToken());

    nestedQueryBuilder.query = () => Promise.resolve([]);
  });

  describe('checkEmailExist', () => {
    const email = 'example@email.com';

    it('should be success return true if data was exists', async () => {
      const resUser = await userQueryFake.checkEmailExist();
      nestedQueryBuilder.query = () => Promise.resolve(resUser);

      jest
        .spyOn(connection.manager, 'getRepository')
        .mockImplementationOnce(() => nestedQueryBuilder);

      const result = await userModel.checkEmailExist(email);

      expect(result).toBe(true);
    });

    it('should be success return false if data was not exists', async () => {
      nestedQueryBuilder.query = () => Promise.resolve([]);

      jest
        .spyOn(connection.manager, 'getRepository')
        .mockImplementationOnce(() => nestedQueryBuilder);

      const result = await userModel.checkEmailExist(email);

      expect(result).toBe(false);
    });

    it('should be failed with unknown error', async () => {
      nestedQueryBuilder.query = () =>
        Promise.reject(new Error('Internal Server Error'));

      jest
        .spyOn(connection.manager, 'getRepository')
        .mockImplementationOnce(() => nestedQueryBuilder);

      await expect(userModel.checkEmailExist(email)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateUserDto = { email: 'example@email.com' };

    it('should be success create new user', async () => {
      nestedQueryBuilder.query = () => Promise.resolve(true);

      jest
        .spyOn(connection.manager, 'getRepository')
        .mockImplementationOnce(() => nestedQueryBuilder);

      const result = await userModel.create(body);

      expect(result).toBe(true);
    });

    it('should be failed with unknown error', async () => {
      nestedQueryBuilder.query = () =>
        Promise.reject(new Error('Internal Server Error'));

      jest
        .spyOn(connection.manager, 'getRepository')
        .mockImplementationOnce(() => nestedQueryBuilder);

      await expect(userModel.create(body)).rejects.toThrowError();
    });
  });
});
