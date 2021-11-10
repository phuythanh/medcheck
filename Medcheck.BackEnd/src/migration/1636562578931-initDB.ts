import {MigrationInterface, QueryRunner} from "typeorm";

export class initDB1636562578931 implements MigrationInterface {
    name = 'initDB1636562578931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Expenses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`value\` int NOT NULL, \`user_id\` int NULL, \`category_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Expenses\` ADD CONSTRAINT \`FK_faf4973b2b10fc22642d7e45f10\` FOREIGN KEY (\`user_id\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Expenses\` ADD CONSTRAINT \`FK_e13fd15282e27627b7135807077\` FOREIGN KEY (\`category_id\`) REFERENCES \`Categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Categories\` ADD CONSTRAINT \`FK_8a87ea60a5a758a58d7b5c5d3d6\` FOREIGN KEY (\`user_id\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Categories\` DROP FOREIGN KEY \`FK_8a87ea60a5a758a58d7b5c5d3d6\``);
        await queryRunner.query(`ALTER TABLE \`Expenses\` DROP FOREIGN KEY \`FK_e13fd15282e27627b7135807077\``);
        await queryRunner.query(`ALTER TABLE \`Expenses\` DROP FOREIGN KEY \`FK_faf4973b2b10fc22642d7e45f10\``);
        await queryRunner.query(`DROP TABLE \`Categories\``);
        await queryRunner.query(`DROP TABLE \`Expenses\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
    }

}
