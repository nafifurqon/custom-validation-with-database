import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      // type: 'postgres',
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: parseInt(configService.get('DB_PORT'), 10),
      username: configService.get('DB_USERNAME'),
      database: configService.get('DB_NAME'),
      password: configService.get('DB_PASSWORD'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      // migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      // cli: {
      //   migrationsDir: __dirname + '/../database/migrations',
      // },
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: false,
      logging: true,
    };
  },
};
