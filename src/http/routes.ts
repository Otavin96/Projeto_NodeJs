import { Request, Response, Router } from "express";

const routes = Router();

routes.get("/", async (request: Request, response: Response) => {
  response.json("Minha primeira rota!");
});

export { routes };
