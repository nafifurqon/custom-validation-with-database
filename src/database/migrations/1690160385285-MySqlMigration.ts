import { MigrationInterface, QueryRunner } from 'typeorm';

export class MySqlMigration1690160385285 implements MigrationInterface {
  name = 'MySqlMigration1690160385285';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(200) NOT NULL, INDEX \`IDX_a3ffb1c0c8416b9fc6f907b743\` (\`id\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a3ffb1c0c8416b9fc6f907b743\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
