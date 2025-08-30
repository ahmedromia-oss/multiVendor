import { UserType } from "shared/constants";
import { hashSaltPassword } from "shared/utils/hashPassword";
import { MigrationInterface, QueryRunner } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();
export class SeedAdminUser1756579837120 implements MigrationInterface {
    name = 'SeedAdminUser1756579837120'
   public async up(queryRunner: QueryRunner): Promise<void> {
    // Get admin email and password from .env
    const email = process.env.adminMail;
    const password = process.env.adminPass;
    console.log(email , password)

    if (!email || !password) {
      throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD not set in .env");
    }

    // Hash the password
    const hashedPassword = await hashSaltPassword(password);

    // Insert admin user
    await queryRunner.query(
      `INSERT INTO "user" ("username", "email", "password", "userType", "isApproved", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
      ["admin", email, hashedPassword, UserType.SUPER_ADMIN, true]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
   
  }
}
