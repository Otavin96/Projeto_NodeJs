import express, { ErrorRequestHandler } from "express";
import "express-async-errors";
import "reflect-metadata";
import { routes } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler as unknown as ErrorRequestHandler);

export { app };
