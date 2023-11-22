import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TableName } from '../utils';

export class User1600957567756 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.User,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
            default: `(REPLACE(UUID(),'-',''))`,
          },
          {
            name: 'first_name',
            type: 'nvarchar',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'nvarchar',
            isNullable: false,
          },
          {
            name: 'is_admin',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'is_active',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          {
            name: 'reason',
            type: 'nvarchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.User, true);
  }
}
