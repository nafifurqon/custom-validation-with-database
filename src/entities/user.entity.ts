import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Index,
  Column,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @PrimaryColumn()
  @Index()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 200, nullable: false })
  email: string;
}
