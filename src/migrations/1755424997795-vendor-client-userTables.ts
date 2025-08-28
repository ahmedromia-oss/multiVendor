import { MigrationInterface, QueryRunner } from "typeorm";

export class VendorClientUserTables1755424997795 implements MigrationInterface {
    name = 'VendorClientUserTables1755424997795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_usertype_enum" AS ENUM('Client', 'VENDOR', 'SUPER_ADMIN')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(100) NOT NULL, "email" character varying NOT NULL, "password" character varying(50) NOT NULL, "userType" "public"."user_usertype_enum" NOT NULL DEFAULT 'Client', "isApproved" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vendor" ("userId" uuid NOT NULL, "storeName" character varying(100), "description" character varying(150), "phone" character varying(20), "address" character varying(100), CONSTRAINT "PK_ac9f553292e6053115be74e4e59" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "client" ("userId" uuid NOT NULL, "phone" character varying(50), "address" character varying(150), CONSTRAINT "PK_ad3b4bf8dd18a1d467c5c0fc13a" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`ALTER TABLE "vendor" ADD CONSTRAINT "FK_ac9f553292e6053115be74e4e59" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_ad3b4bf8dd18a1d467c5c0fc13a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_ad3b4bf8dd18a1d467c5c0fc13a"`);
        await queryRunner.query(`ALTER TABLE "vendor" DROP CONSTRAINT "FK_ac9f553292e6053115be74e4e59"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "vendor"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_usertype_enum"`);
    }

}
