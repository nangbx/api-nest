import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';
import { TableName } from '../utils';

export class AddRelationUserAndPlatformVersion1611389601431 implements MigrationInterface {
  name = 'AddRelationUserAndPlatformVersion1611389601431';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      TableName.PlatformVersions,
      new TableColumn({
        name: 'user_id',
        type: 'varchar',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      TableName.PlatformVersions,
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: TableName.User,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
