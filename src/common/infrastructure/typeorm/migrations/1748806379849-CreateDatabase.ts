import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1748806379849 implements MigrationInterface {
    name = 'CreateDatabase1748806379849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "age" integer NOT NULL, "description" character varying NOT NULL, "weight" integer NOT NULL, "color" character varying NOT NULL, "images" text NOT NULL, "available" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "owner_id" uuid, CONSTRAINT "PK_d01e9e7b4ada753c826720bee8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "adoptions" ADD CONSTRAINT "FK_bfac9cda75ee08a343c5086f2da" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_d6c565fded8031d4cdd54fe1043" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_d6c565fded8031d4cdd54fe1043"`);
        await queryRunner.query(`ALTER TABLE "adoptions" DROP CONSTRAINT "FK_bfac9cda75ee08a343c5086f2da"`);
        await queryRunner.query(`DROP TABLE "pets"`);
    }

}
