import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableName } from '../utils';

export class SeedUser1600960381059 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users (first_name, last_name, is_admin, email, password) values 
        ("Tom", "Mery", true, "tubr1@gmail.com", "$2y$10$2UkhRqmZJ7sTuqW.Rzvh5eLwjDOhDqWDoSTo5tisvzZOw852GPRxC"),
        ("Nguyễn", "Thành", true, "admin@gmail.com", "$2a$10$1aMkJIljP278Ve88Sb3jLeKjDPZJDnEJda7l1bG2sCzEckCpk1SFC"),
        ("Join", "Smith", DEFAULT, "join.smith@gmail.com", "$2a$10$1aMkJIljP278Ve88Sb3jLeKjDPZJDnEJda7l1bG2sCzEckCpk1SFC"),
        ("Mark", "Taylor", DEFAULT, "taylor123@gmail.com", "$2a$10$1aMkJIljP278Ve88Sb3jLeKjDPZJDnEJda7l1bG2sCzEckCpk1SFC")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.User, true);
  }
}
