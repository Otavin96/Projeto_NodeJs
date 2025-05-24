import { DataSource } from "typeorm";
import { config } from "dotenv";

config();

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  entities: ["**/entities/**/*.ts"],
  migrations: ["**/migrations/**/*.ts"],
  synchronize: false,
});
