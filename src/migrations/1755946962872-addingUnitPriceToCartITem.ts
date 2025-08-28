import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingUnitPriceToCartITem1755946962872 implements MigrationInterface {
    name = 'AddingUnitPriceToCartITem1755946962872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_item" ADD "unit_price" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_item" DROP COLUMN "unit_price"`);
    }

}
