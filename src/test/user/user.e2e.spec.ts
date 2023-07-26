import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

/** Models */
import { IUserModel } from '../../modules/user/interfaces/user.model.interface';

/** Services */
import { IUserService } from '../../modules/user/interfaces/user.service.interface';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userService: IUserService;
  let userModel: IUserModel;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: IUserService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: IUserModel,
          useValue: {
            checkEmailExist: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    await app.init();

    userService = moduleFixture.get<IUserService>(IUserService);
    userModel = moduleFixture.get<IUserModel>(IUserModel);
  });

  describe('/user (POST)', () => {
    const body = { email: 'example@email.com' };
    const expectedResult = { status: true };

    it('it should be success return true', async () => {
      const resMock = { status: true };

      jest.spyOn(userModel, 'checkEmailExist').mockResolvedValueOnce(false);
      jest.spyOn(userService, 'create').mockResolvedValueOnce(resMock);

      const res = await request(app.getHttpServer()).post('/user').send(body);

      expect(res.body).toEqual(expectedResult);
    });

    it('it should be failed if email is exist', async () => {
      jest.spyOn(userModel, 'checkEmailExist').mockResolvedValueOnce(true);

      const res = await request(app.getHttpServer()).post('/user').send(body);

      expect(res.body).toHaveProperty('error');
    });

    it('it should be failed with unknown error', async () => {
      jest
        .spyOn(userModel, 'checkEmailExist')
        .mockRejectedValueOnce(new Error('Internal Server Error'));

      const res = await request(app.getHttpServer()).post('/user').send(body);

      expect(res.body).toHaveProperty('error');
    });
  });
});
