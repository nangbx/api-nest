import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';
import { TableName } from '../utils';

export class UpdatePlatformVersionForDeviceTable1611113409642 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(TableName.Device, [
      new TableColumn({
        name: 'current_platform_version_id',
        type: 'int',
        isNullable: true,
      }),
      new TableColumn({
        name: 'allow_auto_update',
        type: 'boolean',
        isNullable: true,
        default: false,
      }),
    ]);

    await queryRunner.createForeignKeys(TableName.Device, [
      new TableForeignKey({
        columnNames: ['current_platform_version_id'],
        referencedColumnNames: ['id'],
        referencedTableName: TableName.PlatformVersions,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
