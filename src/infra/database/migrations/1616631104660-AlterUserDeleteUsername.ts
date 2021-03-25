import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserDeleteUsername1616631104660
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropColumn('users', 'username');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'username',
        type: 'varchar',
        isUnique: true,
      })
    );
  }
}
