import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTokens1617839656421 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'users_tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'refresh_token',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'expires_date',
            type: 'timestamp',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_users_tokens_user',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('users_tokens');
  }
}
