import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  // type: 'postgres',
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: parseInt(configService.get('DB_PORT'), 10),
  username: configService.get('DB_USERNAME'),
  database: configService.get('DB_NAME'),
  password: configService.get('DB_PASSWORD'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*.js'],
  // synchronize: true,
  logging: true,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
