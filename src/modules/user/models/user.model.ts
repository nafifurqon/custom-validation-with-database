import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

/** commons */
import { UserEntity } from '../../../entities/user.entity';

/** DTOs */
import { CreateUserDto } from '../dtos/user.dto';
import { IUserModel } from '../interfaces/user.model.interface';

@Injectable()
export class UserModel implements IUserModel {
  private entityManager: EntityManager;

  constructor(
    // @InjectConnection('postgres_conn')
    private readonly dataSource: DataSource,
  ) {}

  async checkEmailExist(email: string): Promise<boolean> {
    try {
      this.entityManager = this.dataSource.manager;

      const result = await this.entityManager
        .getRepository(UserEntity)
        .query(`SELECT id FROM users WHERE email = ? LIMIT 1`, [email]);

      if (result.length) return true;
      return false;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async create(body: CreateUserDto): Promise<any> {
    try {
      this.entityManager = this.dataSource.manager;

      await this.entityManager
        .getRepository(UserEntity)
        .query(`INSERT INTO users SET ?`, [body]);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
