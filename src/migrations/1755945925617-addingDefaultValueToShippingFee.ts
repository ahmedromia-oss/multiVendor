import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingDefaultValueToShippingFee1755945925617 implements MigrationInterface {
    name = 'AddingDefaultValueToShippingFee1755945925617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client_vendor_follows" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "vendorId" uuid NOT NULL, "clientId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_21cba4e2ceae5e607ecf632ff05" UNIQUE ("clientId", "vendorId"), CONSTRAINT "PK_94bd3de7f10fe0cabcb2e3cf2ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "shippingFee" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "client_vendor_follows" ADD CONSTRAINT "FK_800a45f8ed4d7cb6c19cef061d7" FOREIGN KEY ("clientId") REFERENCES "client"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_vendor_follows" ADD CONSTRAINT "FK_ab03ad69e15d37f1b2cf80714f9" FOREIGN KEY ("vendorId") REFERENCES "vendor"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_vendor_follows" DROP CONSTRAINT "FK_ab03ad69e15d37f1b2cf80714f9"`);
        await queryRunner.query(`ALTER TABLE "client_vendor_follows" DROP CONSTRAINT "FK_800a45f8ed4d7cb6c19cef061d7"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "shippingFee" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "client_vendor_follows"`);
    }

}
