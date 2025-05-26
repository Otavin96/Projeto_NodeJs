import { DataSource } from "typeorm";
import { env } from "../env";

export const dataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_TYPE,
  logging: false,
  entities: ["**/entities/**/*.ts"],
  migrations: ["**/migrations/**/*.ts"],
  synchronize: false,
});
