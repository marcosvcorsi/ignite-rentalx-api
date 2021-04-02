import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSpecificationsCars1617388792242
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'specification_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_specification_cars_car',
            referencedTableName: 'cars',
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },

          {
            name: 'fk_specification_cars_specification',
            referencedTableName: 'specifications',
            referencedColumnNames: ['id'],
            columnNames: ['specification_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
        uniques: [
          {
            name: 'id_specifications_cars',
            columnNames: ['car_id', 'specification_id'],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('specifications_cars');
  }
}
