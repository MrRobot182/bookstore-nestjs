import {MigrationInterface, QueryRunner} from "typeorm";

export class secondMigration1596492985955 implements MigrationInterface {
    name = 'secondMigration1596492985955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_details" ("id" SERIAL NOT NULL, "name" character varying(40) NOT NULL, "lastname" character varying, "status" character varying(8) NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "description" text NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "detail_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_9fc134ca20766e165ad650ee740" UNIQUE ("detail_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9fc134ca20766e165ad650ee740" FOREIGN KEY ("detail_id") REFERENCES "user_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9fc134ca20766e165ad650ee740"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_9fc134ca20766e165ad650ee740"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "detail_id"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "user_details"`);
    }

}
