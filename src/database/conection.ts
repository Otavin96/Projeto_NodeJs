import { config } from "dotenv"
import { Client } from 'pg'

config()


export const conection = async () => {

    const dbConfig = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME
    }

    const client = new Client(dbConfig)

    await client.connect().then(() => {
        console.log("Connected to PostgreSQL database");
    }).catch((err) => {
        console.error("Error connecting to PostgreSQL database", err);
    })

    return client

}