import { MigrationInterface, QueryRunner } from "typeorm";

export class Fixing1755771801159 implements MigrationInterface {
    name = 'Fixing1755771801159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."user_usertype_enum" RENAME TO "user_usertype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_usertype_enum" AS ENUM('CLIENT', 'VENDOR', 'SUPER_ADMIN')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "userType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "userType" TYPE "public"."user_usertype_enum" USING "userType"::"text"::"public"."user_usertype_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "userType" SET DEFAULT 'CLIENT'`);
        await queryRunner.query(`DROP TYPE "public"."user_usertype_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_usertype_enum_old" AS ENUM('Client', 'VENDOR', 'SUPER_ADMIN')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "userType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "userType" TYPE "public"."user_usertype_enum_old" USING "userType"::"text"::"public"."user_usertype_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "userType" SET DEFAULT 'Client'`);
        await queryRunner.query(`DROP TYPE "public"."user_usertype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_usertype_enum_old" RENAME TO "user_usertype_enum"`);
    }

}
