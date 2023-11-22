import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TableName } from '../utils';

export class PlatformVersions1611113258838 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.PlatformVersions,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { type: 'varchar', name: 'release_key', isNullable: false, isUnique: true },
          {
            name: 'name',
            type: 'nvarchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'longtext',
          },
          {
            name: 'release_type',
            type: `ENUM ('STABLE', 'BETA')`,
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

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
